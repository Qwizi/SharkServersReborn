import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {Crud, CrudController} from "@nestjsx/crud";
import {Question} from "../entity/question.entity";
import {QuestionService} from "../services/question.service";

@ApiTags('applications-questions')
@Crud({
	model: {
		type: Question,
	},
	routes: {
		only: ["getOneBase", "getManyBase"]
	},
	query: {
		alwaysPaginate: true,
	}
})
@Controller("api/recruitment/questions")
export class QuestionController implements CrudController<Question> {
	constructor(
		public service: QuestionService,
	) {}
}