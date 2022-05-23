import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Position } from "./entity/position.entity";
import { PositionService } from "./services/position.service";
import { PositionController } from "./controllers/position.controller";
import { Comment } from "./entity/comment.entity";
import { PositionQuestionAnswer } from "./entity/positionQuestionAnswer.entity";
import { PositionQuestionAnswerService } from "./services/positionQuestionAnswer.service";
import { QuestionService } from "./services/question.service";
import { Question } from "./entity/question.entity";
import { QuestionController } from "./controllers/question.controller";
import { RolesModule } from "../roles/roles.module";
import { PositionAdminController } from "./controllers/admin/position.admin.controller";
import { QuestionAdminController } from "./controllers/admin/questions.admin.controller";
import { Application } from "./entity/application.entity";
import { ApplicationService } from "./services/application.service";
import { ApplicationAdminController } from "./controllers/admin/application.admin.controller";
import { CommentController } from "./controllers/comment.controller";
import { CommentsService } from "./services/comment.service";
import { ApplicationController } from "./controllers/application.controller";
import { UsersModule } from "../users/users.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Position,
			Application,
			Question,
			PositionQuestionAnswer,
			Comment,
		]),
		UsersModule,
		RolesModule
	],
	providers: [
		PositionService,
		QuestionService,
		PositionQuestionAnswerService,
		ApplicationService,
		CommentsService,
	],
	controllers: [
		PositionController,
		PositionAdminController,
		QuestionController,
		QuestionAdminController,
		ApplicationController,
		ApplicationAdminController,
		CommentController
	]
})
export class RecruitmentModule {
}
