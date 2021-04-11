import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {Controller, UseGuards} from "@nestjs/common";
import {Server} from "../entity/server.entity";
import {ServersService} from "../services/servers.service";
import {Player} from "../entity/player.entity";
import {PlayersService} from "../services/players.service";
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";
import {CreateServerDto} from "../dto/createServer.dto";
import {CreatePlayerDto} from "../dto/createPlayer.dto";

@Crud({
	model: {
		type: Player,
	},
	routes: {
		only: ["getOneBase", "getManyBase", "createOneBase"]
	},
	query: {
		alwaysPaginate: true,
		join: {
			server: {},
			steam_profile: {},
			stats: {}
		}
	}
})
@Controller("api/servers/players")
export class PlayersController implements CrudController<Player> {
	constructor(
		public service: PlayersService,
	) {}

	@Override("createOneBase")
	@UseGuards(AuthenticatedGuard)
	async createOne(@ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreatePlayerDto) 	{
		return this.service._create(dto);
	}
}