import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import {
	Crud,
	CrudAuth,
	CrudController,
	CrudRequest,
	JoinOptions,
	Override,
	ParsedBody,
	ParsedRequest
} from "@nestjsx/crud";
import {Position} from "../entity/position.entity";
import {PositionService} from "../services/position.service";
import {CreatePositionDto} from "../dto/createPosition.dto";
import {Perms} from "../../auth/decorators/permissions.decorator";

@Crud({
	model: {
		type: Position,
	},
	query: {
		alwaysPaginate: true,
		join: {
			application: {
				eager: true
			},
			role: {
				eager: true
			},
			questions: {
				eager: true
			}
		}
	}
})
@Controller("api/admin/recruitment/position")
export class PositionAdminController implements CrudController<Position> {
	constructor(
		public service: PositionService) {}

	@Override("createOneBase")
	async createOne(@Req() req, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreatePositionDto) {
		return this.service.create(dto);
	}

}