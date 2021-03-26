import {BadRequestException, Controller, Req, UseGuards} from "@nestjs/common";
import {Crud, CrudController, CrudRequest, JoinOptions, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {Position} from "../entity/position.entity";
import {PositionService} from "../services/position.service";

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
			role: {
				eager: true
			},
			questions: {
				eager: true
			},
			answers: {
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
export class PositionController implements CrudController<Position> {
	constructor(
		public service: PositionService) {
	}
}