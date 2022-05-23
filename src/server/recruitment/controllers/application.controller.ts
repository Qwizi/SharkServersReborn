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
import {Perms} from "../../auth/decorators/permissions.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('applications')
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
			position: {},
			'position.role': {},
			author: {
				exclude: ["password"]
			},
			'author.roles': {
			},
			steam_profile: {
			},
			questions_answers: {
			},
			"questions_answers.question": {
			},
			comments: {
			},
		}
	}
})
@Controller("recruitment/application")
export class ApplicationController implements CrudController<Application> {
	constructor(
		public service: ApplicationService) {}

	@Override("createOneBase")
	@UseGuards(AuthenticatedGuard, SteamGuard)
	@Perms('recruitment.create_application')
	async createOne(@Req() req, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreateApplicationDto) 	{
		const {user} = req;
		const {steam_profile} = user;
		return this.service.create(crudRequest, user, steam_profile, dto);
	}

	@Put(":id/accept")
	@UseInterceptors(CrudRequestInterceptor)
	@Perms('recruitment.accept_application')
	async accept(
		@ParsedRequest() crudRequest: CrudRequest,
		@Param('id') id: string
	) {
		return this.service.runAction(crudRequest, id, ApplicationStatus.ACCEPTED);
	}

	@Put(":id/open")
	@UseInterceptors(CrudRequestInterceptor)
	@Perms('recruitment.open_application')
	async open(
		@ParsedRequest() crudRequest: CrudRequest,
		@Param('id') id: string
	) {
		return this.service.runAction(crudRequest, id, ApplicationStatus.OPEN);
	}

	@Put(":id/reject")
	@UseInterceptors(CrudRequestInterceptor)
	@Perms('recruitment.reject_application')
	async reject(
		@ParsedRequest() crudRequest: CrudRequest,
		@Param('id') id: string
	) {
		return this.service.runAction(crudRequest, id, ApplicationStatus.REJECTED);
	}
}