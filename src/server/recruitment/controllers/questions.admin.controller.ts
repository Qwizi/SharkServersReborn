import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {Question} from "../entity/question.entity";
import {QuestionService} from "../services/question.service";

@Crud({
	model: {
		type: Question,
	},
	query: {
		alwaysPaginate: true,
	}
})
@Controller("api/admin/recruitment/questions")
export class QuestionAdminController implements CrudController<Question> {
	constructor(
		public service: QuestionService,
	) {}
}