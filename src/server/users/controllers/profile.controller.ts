import {Body, Controller, Param, Post, Put, Req, UseGuards, UseInterceptors} from "@nestjs/common";
import {
	Crud, CrudAuth,
	CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest,
} from "@nestjsx/crud";
import {User} from "../entity/users.entity";
import {UsersService} from "../services/users.service";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {Perms} from "../../auth/decorators/permissions.decorator";
import {ApplicationStatus} from "../../recruitment/recruitment.enum";
import {ChangePasswordDto} from "../../profile/dto/changePassword.dto";


@Crud({
	model: {
		type: User,
	},
	routes: {
		only: ["getOneBase"]
	},
	params: {
		id: {
			primary: true,
			disabled: true,
		},
	},
	query: {
		join: {
			roles: {
				eager: true
			},
			'roles.permissions': {
				eager: true
			},
			steam_profile: {
				eager: true
			},
			news: {},
			recruitment_comments: {},
			applications: {}
		}
	}
})
@CrudAuth({
	property: "user",
	filter: (user: User) => ({
		id: user.id,
	}),
})
@UseGuards(AuthenticatedGuard)
@Controller("api/users/profile")
export class ProfileController implements CrudController<User> {
	constructor(
		public service: UsersService) {
	}

	//!TODO zamienic na PUT
	@UseInterceptors(CrudRequestInterceptor)
	@Post("password")
	@Perms('profile.change_password')
	async changePassword(
		@Req() req,
		@Body() dto: ChangePasswordDto
	) {
		return this.service.changePassword(req.user, dto);
	}
}