import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {RecruitmentPosition} from "../entity/recruitmentPosition.entity";

@Injectable()
export class RecruitmentPositionService extends TypeOrmCrudService<RecruitmentPosition> {
    constructor(@InjectRepository(RecruitmentPosition) repo) {
        super(repo);
    }
}
