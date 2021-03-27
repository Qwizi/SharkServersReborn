import {Controller, Req, UseGuards} from "@nestjs/common";
import {
	Crud,
	CrudController,
	CrudRequest,
	Override,
	ParsedBody,
	ParsedRequest
} from "@nestjsx/crud";
import {Application} from "../entity/application.entity";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {SteamGuard} from "../../auth/guards/steam.guard";
import {ApplicationService} from "../services/application.service";
import {CreateApplicationDto} from "../dto/createApplication.dto";

@Crud({
	model: {
		type: Application,
	},
	routes: {
		only: ["getOneBase", "getManyBase", "createOneBase"]
	},
	params: {
		id: {
			type: 'uuid'
		}
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
			},
			comments: {
				eager: true
			},
		}
	}
})
@Controller("api/recruitment/application")
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