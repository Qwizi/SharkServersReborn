import { Module } from '@nestjs/common';
import {RecruitmentApplication} from "./entity/recruitmentApplication.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RecruitmentPosition} from "./entity/recruitmentPosition.entity";
import { RecruitmentApplicationService } from './services/recruitmentApplication.service';
import {RecruitmentPositionService} from "./services/recruitmentPosition.service";
import {RecruitmentApplicationController} from "./controllers/recruitmentApplication.controller";
import {RecruitmentPositionController} from "./controllers/recruitmentPosition.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        RecruitmentApplication,
        RecruitmentPosition
    ])],
    providers: [
        RecruitmentApplicationService,
        RecruitmentPositionService
    ],
    controllers: [
        RecruitmentApplicationController,
        RecruitmentPositionController
    ]
})
export class RecruitmentModule {}
