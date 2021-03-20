import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import {Crud, CrudAuth, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {RecruitmentApplication} from "../entity/recruitmentApplication.entity";
import {RecruitmentApplicationService} from "../services/recruitmentApplication.service";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {SteamGuard} from "../../auth/guards/steam.guard";
import {User} from "../../users/users.entity";
import {CreateApplicationDto} from "../dto/createApplication.dto";
import {RecruitmentPositionService} from "../services/recruitmentPosition.service";

@Crud({
	model: {
		type: RecruitmentApplication,
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
		join: {
			position: {
				eager: true
			},
			'position.role': {
				eager: true
			},
			author: {
				eager: true
			},
			steam_profile: {
				eager: true
			}
		}
	}
})
@Controller("api/recruitment/application")
export class RecruitmentApplicationController implements CrudController<RecruitmentApplication> {
	constructor(
		public service: RecruitmentApplicationService,
		public recruitmentPositionService: RecruitmentPositionService
	) {
	}

	@Override("createOneBase")
	@UseGuards(AuthenticatedGuard, SteamGuard)
	async createOne(@Req() req, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreateApplicationDto) {
		const position = await this.recruitmentPositionService.findOne({
			where: {
				id: dto.position
			}
		})

		if (!position) throw new BadRequestException('position not found');

		return this.service.createOne(crudRequest, {
			author: req.user,
			steam_profile: req.user.steam_profile,
			position: position,
			age: dto.age,
			experience: dto.experience,
			description: dto.description,
		})
	}
}