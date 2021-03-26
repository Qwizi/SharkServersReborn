import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Position} from "./entity/position.entity";
import {PositionService} from "./services/position.service";
import {PositionController} from "./controllers/position.controller";
import {Comment} from "./entity/comment.entity";
import {PositionQuestionAnswer} from "./entity/positionQuestionAnswer.entity";
import {PositionQuestionAnswerService} from "./services/positionQuestionAnswer.service";
import {QuestionService} from "./services/question.service";
import {Question} from "./entity/question.entity";
import {PositionQuestionAnswerController} from "./controllers/positionQuestionAnswer.controller";
import {QuestionController} from "./controllers/question.controller";
import {RolesModule} from "../roles/roles.module";
import {PositionAdminController} from "./controllers/position.admin.controller";
import {QuestionAdminController} from "./controllers/questions.admin.controller";
import {Application} from "./entity/application.entity";
import {ApplicationService} from "./services/application.service";
import {ApplicationAdminController} from "./controllers/application.admin.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        Position,
        Application,
        Question,
        PositionQuestionAnswer,
        Comment,
    ]),
    RolesModule
    ],
    providers: [
        PositionService,
        QuestionService,
        PositionQuestionAnswerService,
        ApplicationService
    ],
    controllers: [
        PositionController,
        PositionAdminController,
        PositionQuestionAnswerController,
        QuestionController,
        QuestionAdminController,
        ApplicationAdminController
    ]
})
export class RecruitmentModule {}
