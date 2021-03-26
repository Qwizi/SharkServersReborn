import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import {Crud, CrudAuth, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {SteamGuard} from "../../auth/guards/steam.guard";
import {PositionService} from "../services/position.service";
import {PositionQuestionAnswer} from "../entity/positionQuestionAnswer.entity";
import {PositionQuestionAnswerService} from "../services/positionQuestionAnswer.service";
import {CreateApplicationDto} from "../dto/createApplication.dto";

@Crud({
	model: {
		type: PositionQuestionAnswer,
	},
	routes: {
		only: ["getOneBase", "getManyBase", "createOneBase"]
	},
	params: {
		id: {
			field: 'id',
			type: "uuid",
			primary: true
		},
	},
	query: {
		alwaysPaginate: true,
	}
})
@Controller("api/recruitment/application")
export class PositionQuestionAnswerController implements CrudController<PositionQuestionAnswer> {
	constructor(
		public service: PositionQuestionAnswerService
	) {
	}

	@Override("createOneBase")
	@UseGuards(AuthenticatedGuard, SteamGuard)
	async createOne(@Req() req, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreateApplicationDto) {
		const {positionId, answers} = dto;
	}
}