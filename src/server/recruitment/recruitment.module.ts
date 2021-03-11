import { Module } from '@nestjs/common';
import {RecruitmentApplication} from "./entity/recruitmentApplication.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RecruitmentPosition} from "./entity/recruitmentPosition.entity";

@Module({
    imports: [TypeOrmModule.forFeature([
        RecruitmentApplication,
        RecruitmentPosition
    ])]
})
export class RecruitmentModule {}
