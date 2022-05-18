import {Controller, Req, UseGuards} from "@nestjs/common";
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {CommentsService} from "../services/comment.service";
import {Comment} from "../entity/comment.entity";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {CreateCommentDto} from "../dto/createComment.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('applications-comments')
@Crud({
	model: {
		type: Comment,
	},
	routes: {
		only: ["getOneBase", "getManyBase", "createOneBase"]
	},
	query: {
		alwaysPaginate: true,
		join: {
			author: {},
			application: {}
		}
	}
})
@Controller("api/recruitment/comment")
export class CommentController implements CrudController<Comment> {
	constructor(
		public service: CommentsService,
	) {}

	@Override("createOneBase")
	@UseGuards(AuthenticatedGuard)
	async createOne(@Req() req, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreateCommentDto) 	{
		const {user} = req;
		return this.service.create(crudRequest, user, dto);
	}
}