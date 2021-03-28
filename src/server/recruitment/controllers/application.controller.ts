import {Controller, Param, Put, Req, UseGuards, UseInterceptors} from "@nestjs/common";
import {
	Crud,
	CrudController,
	CrudRequest,
	CrudRequestInterceptor,
	Override,
	ParsedBody,
	ParsedRequest,
} from "@nestjsx/crud";
import {Application} from "../entity/application.entity";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {SteamGuard} from "../../auth/guards/steam.guard";
import {ApplicationService} from "../services/application.service";
import {CreateApplicationDto} from "../dto/createApplication.dto";
import {ApplicationStatus} from "../recruitment.enum";

@Crud({
	model: {
		type: Application,
	},
	routes: {
		only: ["getOneBase", "getManyBase", "createOneBase"]
	},
	params: {
		id: {
			field: 'id',
			type: 'uuid',
			primary: true,
		},
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
export class ApplicationController implements CrudController<Application> {
	constructor(
		public service: ApplicationService) {}

	@Override("createOneBase")
	@UseGuards(AuthenticatedGuard, SteamGuard)
	async createOne(@Req() req, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreateApplicationDto) 	{
		const {user} = req;
		const {steam_profile} = user;
		return this.service.create(crudRequest, user, steam_profile, dto);
	}

	@Put(":id/accept")
	@UseInterceptors(CrudRequestInterceptor)
	async accept(
		@ParsedRequest() crudRequest: CrudRequest,
		@Param('id') id: string
	) {
		return this.service.runAction(crudRequest, id, ApplicationStatus.ACCEPTED);
	}

	@Put(":id/open")
	@UseInterceptors(CrudRequestInterceptor)
	async open(
		@ParsedRequest() crudRequest: CrudRequest,
		@Param('id') id: string
	) {
		return this.service.runAction(crudRequest, id, ApplicationStatus.OPEN);
	}

	@Put(":id/reject")
	@UseInterceptors(CrudRequestInterceptor)
	async reject(
		@ParsedRequest() crudRequest: CrudRequest,
		@Param('id') id: string
	) {
		return this.service.runAction(crudRequest, id, ApplicationStatus.REJECTED);
	}
}