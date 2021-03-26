import {BadRequestException, Injectable, OnModuleInit} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Position} from "../entity/position.entity";
import {CreatePositionDto} from "../dto/createPosition.dto";
import {QuestionService} from "./question.service";
import {In} from "typeorm";
import {RolesService} from "../../roles/roles.service";
import {CrudRequest} from "@nestjsx/crud";

@Injectable()
export class PositionService extends TypeOrmCrudService<Position> implements OnModuleInit{
    constructor(
        @InjectRepository(Position) repo,
        private rolesService: RolesService,
        private questionsService: QuestionService
    ) {
        super(repo);
    }

    async onModuleInit() {
    }

    async create(dto: CreatePositionDto) {
        const {roleId, questions} = dto;
        const role = await this.rolesService.findOne({where: {id: roleId}})
        if (!role)  throw new BadRequestException('Role not found');
        const positionExist = await this.repo.findOne({where: {role: role}})
        if (positionExist) throw new BadRequestException('Position exists');
        const questionsFromDb = await this.questionsService.find({
            where: {
                id: In(questions)
            }
        })
        const questionsIdFromDb = [];
        for (const question of questionsFromDb) {
            questionsIdFromDb.push(question.id);
        }
        const questionsNotFound = questions.filter(e => !questionsIdFromDb.includes(e))
        if (questionsNotFound.length > 0) {
            throw new BadRequestException(`Questions with id ${JSON.stringify(questionsNotFound)} not found`)

        }
        const position = await this.repo.create({role: role, questions: questionsFromDb})
        await this.repo.save(position);
       /* position.questions = questionsFromDb;
        await this.updateOne(req, {questions: questionsFromDb})*/
        return position
    }
}
