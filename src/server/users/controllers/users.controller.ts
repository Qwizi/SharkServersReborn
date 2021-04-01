import {Controller} from "@nestjs/common";
import {
	Crud,
	CrudController,
} from "@nestjsx/crud";
import {User} from "../entity/users.entity";
import {UsersService} from "../services/users.service";

@Crud({
	model: {
		type: User,
	},
	routes: {
		only: ["getOneBase", "getManyBase"]
	},
	query: {
		alwaysPaginate: true,
	}
})
@Controller("api/users")
export class UsersController implements CrudController<User> {
	constructor(
		public service: UsersService) {
	}
}