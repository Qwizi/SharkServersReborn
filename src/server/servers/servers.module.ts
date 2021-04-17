import {CacheModule, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Server} from "./entity/server.entity";
import {RolesModule} from "../roles/roles.module";
import {PermissionsModule} from "../permissions/permissions.module";
import {ServersAdminController} from "./controllers/admin/servers.admin.controller";
import {ServersController} from "./controllers/servers.controller";
import {ServersService} from "./services/servers.service";
import {Player} from "./entity/player.entity";
import {PlayerStats} from "./entity/playerStats.entity";
import {PlayersService} from "./services/players.service";
import {SteamProfileModule} from "../steamprofile/steamProfile.module";
import {PlayersStatsService} from "./services/playersStats.service";
import {PlayersController} from "./controllers/players.controller";
import {ServersGateway} from "./gateway/servers.gateway";
import * as redisStore from 'cache-manager-redis-store';
@Module({
	imports: [
		TypeOrmModule.forFeature([
			Server,
			Player,
			PlayerStats
		]),
		RolesModule,
		PermissionsModule,
		SteamProfileModule,
		CacheModule.register({
			store: redisStore,
			host: process.env.REDIS_HOST,
			//port: process.env.REDIS_PORT
		})
	],
	controllers: [
		PlayersController,
		ServersAdminController,
		ServersController,
	],
	providers: [
		ServersService,
		PlayersService,
		PlayersStatsService,
		ServersGateway
	],
	exports: [ServersService]
})
export class ServersModule {
}
