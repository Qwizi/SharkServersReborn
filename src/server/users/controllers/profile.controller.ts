import {Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors} from "@nestjs/common";
import {
	Crud, CrudAuth,
	CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest,
} from "@nestjsx/crud";
import {User} from "../entity/users.entity";
import {UsersService} from "../services/users.service";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {Perms} from "../../auth/decorators/permissions.decorator";
import {ApplicationStatus} from "../../recruitment/recruitment.enum";
import {ChangePasswordDto} from "../dto/changePassword.dto";
import {ChangeUsernameDto} from "../dto/changeUsername.dto";
import {SendChangeEmailEmailDto} from "../dto/sendChangeEmailEmail.dto";
import {ChangeEmailDto} from "../dto/changeEmail.dto";


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
	@Perms('users.change_password')
	async changePassword(
		@Req() req,
		@Body() dto: ChangePasswordDto
	) {
		return this.service.changePassword(req.user, dto);
	}

	//!TODO zamiaaniec na PUT
	@UseInterceptors(CrudRequestInterceptor)
	@Post("username")
	@Perms('users.change_username')
	async changeUsername(
		@Req() req,
		@Body() dto: ChangeUsernameDto
	) {
		return this.service.changeUsername(req.user, dto)
	}
	
	@UseInterceptors(CrudRequestInterceptor)
	@Post("email/send")
	@Perms('users.change_email')
	async sendChangeEmail(
		@Req() req,
		@Body() dto: SendChangeEmailEmailDto
	) {
		return this.service.sendChangeEmail(req.user.id, req, dto)
	}

	@UseInterceptors(CrudRequestInterceptor)
	@Post("email")
	@Perms("users.change_email")
	async changeEmail(
		@Req() req,
		@Body() dto: ChangeEmailDto
	) {
		return this.service.changeEmail(req.user, dto)
	}
}