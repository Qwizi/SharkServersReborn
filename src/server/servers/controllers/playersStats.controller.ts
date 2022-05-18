import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { PlayerStats } from "../entity/playerStats.entity";
import { PlayersStatsService } from "../services/playersStats.service";

@ApiTags('admin')
@Crud({
	model: {
		type: PlayerStats,
	},
	routes: {
		only: ["getOneBase", "getManyBase"]
	},
	query: {
		alwaysPaginate: true,
		join: {
			player: {eager: true},
		}
	}
})
@Controller("api/servers-players-stats")
export class PlayersStatsController implements CrudController<PlayerStats> {
	constructor(
		public service: PlayersStatsService,
	) {}
}