import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import {
	Crud,
	CrudAuth,
	CrudController,
	CrudRequest,
	JoinOptions,
	Override,
	ParsedBody,
	ParsedRequest
} from "@nestjsx/crud";
import {CreatePositionDto} from "../dto/createPosition.dto";
import {Application} from "../entity/application.entity";
import {ApplicationService} from "../services/application.service";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {SteamGuard} from "../../auth/guards/steam.guard";
import {CreateApplicationDto} from "../dto/createApplication.dto";

@Crud({
	model: {
		type: Application,
	},
	query: {
		alwaysPaginate: true,
		join: {
			position: {
				eager: true
			},
			author: {
				eager: true,
				exclude: ["password"]
			},
			'author.role': {
				eager: true
			},
			steam_profile: {
				eager: true
			},
			questions_answers: {
				eager: true
			},
			"questions_answers.question": {
				eager: true
			}
		}
	}
})
@Controller("api/admin/recruitment/application")
export class ApplicationAdminController implements CrudController<Application> {
	constructor(
		public service: ApplicationService) {}

	@Override("createOneBase")
	@UseGuards(AuthenticatedGuard, SteamGuard)
	async createOne(@Req() req, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreateApplicationDto) 	{
		const {user} = req;
		const {steam_profile} = user;
		return this.service.create(crudRequest, user, steam_profile, dto);
	}

}