import {BadRequestException, Injectable, OnModuleInit} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreatePositionDto} from "../dto/createPosition.dto";
import {Application} from "../entity/application.entity";
import {CrudRequest} from "@nestjsx/crud";
import {User} from "../../users/users.entity";
import {SteamProfile} from "../../steamprofile/steamProfile.entity";
import {CreateApplicationDto} from "../dto/createApplication.dto";
import {In} from "typeorm";
import {PositionService} from "./position.service";
import {QuestionService} from "./question.service";
import {PositionQuestionAnswerService} from "./positionQuestionAnswer.service";
import {ApplicationStatus} from "../recruitment.enum";
import {RolesService} from "../../roles/roles.service";
import {UsersService} from "../../users/users.service";

@Injectable()
export class ApplicationService extends TypeOrmCrudService<Application> implements OnModuleInit {
	constructor(
		@InjectRepository(Application) repo,
		private positionsService: PositionService,
		private questionsService: QuestionService,
		public positionQuestionAnswerService: PositionQuestionAnswerService,
		private usersService: UsersService,
	) {
		super(repo);
	}

	async onModuleInit() {
	}

	async create(crudReq: CrudRequest, author: User, steamProfile: SteamProfile, dto: CreateApplicationDto) {
		const {positionId, answers} = dto;
		console.log(answers);
		const position = await this.positionsService.findOne({
			where: {id: positionId}
		})
		if (!position) throw new BadRequestException("Position not found")

		let questionsId = [];
		for (const item of answers) {
			console.log(item);
			// @ts-ignore
			questionsId.push(item.questionId);
		}

		console.log(questionsId);

		const questionsFromDb = await this.questionsService.find({
			where: {
				id: In(questionsId),
				position: positionId
			}
		})

		console.log(questionsFromDb);

		const questionsNotFound = questionsId.filter(e => questionsFromDb.includes(e))

		if (questionsNotFound.length > 0) {
			throw new BadRequestException(`Questions with id ${JSON.stringify(questionsNotFound)} not found`)
		}

		const application = await this.repo.create({
			position: position,
			author: author,
			steam_profile: steamProfile,
		})

		const questionAnswers = [];
		for await (const item of answers) {
			// @ts-ignore
			const {questionId, answer} = item;
			const question = questionsFromDb.find(item => item.id == questionId);
			const questionAnswer = await this.positionQuestionAnswerService.createOne(crudReq, {
				application: application,
				question: question,
				answer: answer
			})
			questionAnswers.push(questionAnswer)
		}

		console.log(questionAnswers);

		application.questions_answers = questionAnswers;
		await this.repo.save(application)
		return application
	}

	async runAction(crudReq: CrudRequest, applicationId: string, status: ApplicationStatus) {
		const application = await this.findOne({
			where: {
				id: applicationId
			},
			relations: ["position", "position.role", "author", "author.roles"]
		})
		if (!application) throw new BadRequestException('Application is invalid');
		if (application.status === status) throw new BadRequestException(`Application is already ${status}`)
		application.status = status
		await this.repo.save(application)

		if (application.status === ApplicationStatus.ACCEPTED) {
			const applicationPositionRole = application.position.role;
			const applicationAuthorRoles = application.author.roles;
			if (!applicationAuthorRoles.find(role => role.id === applicationPositionRole.id)) {
				await this.usersService.update(application.author, {roles: [...application.author.roles, applicationPositionRole]})
			}
		}
		return application
	}
}