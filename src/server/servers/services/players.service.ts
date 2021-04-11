import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Player} from "../entity/player.entity";
import {ServersService} from "./servers.service";
import {SteamProfileService} from "../../steamprofile/steamProfile.service";
import {CreatePlayerDto} from "../dto/createPlayer.dto";
import {CrudRequest} from "@nestjsx/crud";

@Injectable()
export class PlayersService extends TypeOrmCrudService<Player> {
	private logger = new Logger(PlayersService.name);

	constructor(
		@InjectRepository(Player) repo,
		private serversService: ServersService,
		private steamProfileService: SteamProfileService
	) {
		super(repo);
	}

	async _create(dto: CreatePlayerDto) {
		const {server_id, steamid64} = dto;

		if (!await this.serversService.findOne({
			where: {id: server_id}
		})) throw new BadRequestException('Server not exists');

		const server = await this.serversService.findOne({
			where: {id: server_id}
		})

		let steamProfile;
		steamProfile = await this.steamProfileService.findOne({
			where: {
				steamid64: steamid64
			}
		})
		if (!steamProfile) {
			steamProfile = await this.steamProfileService.create({
				steamid64: steamid64
			})
		}

		let player;

		player = await this.repo.findOne({
			where: {
				server: server,
				steam_profile: steamProfile
			}
		})

		if (!player) {
			player = await this.repo.create({
				server: server,
				steam_profile: steamProfile
			})

			await this.repo.save(player);
		}

		return player;
	}
}