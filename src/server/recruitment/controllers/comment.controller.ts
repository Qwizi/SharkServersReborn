import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import {Crud, CrudController, CrudRequest, JoinOptions, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {Position} from "../entity/position.entity";
import {PositionService} from "../services/position.service";
import {CommentsService} from "../services/comment.service";
import {Comment} from "../entity/comment.entity";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {SteamGuard} from "../../auth/guards/steam.guard";

@Crud({
	model: {
		type: Position,
	},
	routes: {
		only: ["getOneBase", "getManyBase", "createOneBase"]
	},
	query: {
		alwaysPaginate: true,
		join: {
			author: {
				eager: true
			}
		},
		filter: {
			free_space: {
				$gt: 0
			}
		}
	}
})
@Controller("api/recruitment/position")
export class CommentController implements CrudController<Comment> {
	constructor(
		public service: CommentsService,
	) {}
}