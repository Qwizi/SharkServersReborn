import { BadRequestException, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "../entity/player.entity";
import { ServersService } from "./servers.service";
import { SteamProfileService } from "../../steamprofile/steamProfile.service";
import { CreatePlayerDto } from "../dto/createPlayer.dto";
import { SteamProfile } from "src/server/steamprofile/steamProfile.entity";
import { Server } from "../entity/server.entity";
import { Raw } from "typeorm";
import { PlayersStatsService } from "./playersStats.service";
import { PlayerStats } from "../entity/playerStats.entity";

@Injectable()
export class PlayersService extends TypeOrmCrudService<Player> implements OnModuleInit{
	private logger = new Logger(PlayersService.name);

	constructor(
		@InjectRepository(Player) repo,
		private serversService: ServersService,
		private steamProfileService: SteamProfileService,
		private playersStatsService: PlayersStatsService
	) {
		super(repo);
	}

	async onModuleInit() {
		
	}

	async _create(dto: CreatePlayerDto) {
		const { server, steam_profile } = dto;
		const playerStats: PlayerStats = await this.playersStatsService._create();
		const player: Player = await this.repo.create({
			server: server,
			steam_profile: steam_profile,
			stats: [playerStats]
		})

		await this.repo.save(player);
		return player;
	}

	async addStats(player: Player, stats: PlayerStats) {
		player.stats = [...player.stats, stats]
		await this.repo.save(player)
	}
}