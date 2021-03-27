import {BadRequestException, Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../entity/comment.entity";
import {CrudRequest} from "@nestjsx/crud";
import {User} from "../../users/users.entity";
import {CreateCommentDto} from "../dto/createComment.dto";
import {ApplicationService} from "./application.service";
import {ApplicationStatus} from "../recruitment.enum";

@Injectable()
export class CommentsService extends TypeOrmCrudService<Comment> {
	constructor(
		@InjectRepository(Comment) repo,
		private applicationService: ApplicationService
	) {
		super(repo);
	}

	async create(crudReq: CrudRequest, author: User, dto: CreateCommentDto) {
		const {applicationId, content} = dto;
		const application = await this.applicationService.findOne({
			where: {
				id: applicationId
			}
		})

		if (!application) throw new BadRequestException("Application id is invalid");

		if (application.status !== ApplicationStatus.OPEN) throw new BadRequestException("Cannot add comment to closed application")

		return this.createOne(crudReq, {
			application: application,
			content: content,
			author: author
		})
	}
}
