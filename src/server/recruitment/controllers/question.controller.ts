import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {Question} from "../entity/question.entity";
import {QuestionService} from "../services/question.service";

@Crud({
	model: {
		type: Question,
	},
	routes: {
		only: ["getOneBase", "getManyBase", "createOneBase"]
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