import {Injectable, Logger} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Player} from "../entity/player.entity";
import {PlayerStats} from "../entity/playerStats.entity";

@Injectable()
export class PlayersStatsService extends TypeOrmCrudService<PlayerStats> {
	private logger = new Logger(PlayersStatsService.name);

	constructor(
		@InjectRepository(PlayerStats) repo,
	) {
		super(repo);
	}
}