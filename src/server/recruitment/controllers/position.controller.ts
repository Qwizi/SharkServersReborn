import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {Crud, CrudController, CrudRequest, JoinOptions, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {Position} from "../entity/position.entity";
import {PositionService} from "../services/position.service";

@ApiTags('applications-position')
@Crud({
	model: {
		type: Position,
	},
	routes: {
		only: ["getOneBase", "getManyBase"]
	},
	query: {
		alwaysPaginate: true,
		join: {
			role: {},
			questions: {}
		},
/*		filter: {
			free_space: {
				$gt: 0
			}
		}*/
	}
})
@Controller("recruitment/position")
export class PositionController implements CrudController<Position> {
	constructor(
		public service: PositionService) {
	}
}