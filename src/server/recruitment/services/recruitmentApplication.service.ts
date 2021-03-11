import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {RecruitmentApplication} from "../entity/recruitmentApplication.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RecruitmentApplicationService extends TypeOrmCrudService<RecruitmentApplication> {
    constructor(@InjectRepository(RecruitmentApplication) repo) {
        super(repo);
    }
}
