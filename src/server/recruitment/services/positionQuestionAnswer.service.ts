import {BadRequestException, Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {PositionQuestionAnswer} from "../entity/positionQuestionAnswer.entity";
import {CrudRequest} from "@nestjsx/crud";
import {User} from "../../users/users.entity";
import {SteamProfile} from "../../steamprofile/steamProfile.entity";
import {CreateApplicationDto} from "../dto/createApplication.dto";
import {PositionService} from "./position.service";
import {QuestionService} from "./question.service";
import {In} from "typeorm";

@Injectable()
export class PositionQuestionAnswerService extends TypeOrmCrudService<PositionQuestionAnswer> {
	constructor(
		@InjectRepository(PositionQuestionAnswer) repo,
		private positionsService: PositionService,
		private questionsService: QuestionService
	) {
		super(repo);
	}
}
