import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Server} from "./entity/server.entity";
import {RolesModule} from "../roles/roles.module";
import {PermissionsModule} from "../permissions/permissions.module";
import {ServersAdminController} from "./controllers/admin/servers.admin.controller";
import {ServersController} from "./controllers/servers.controller";
import {ServersService} from "./services/servers.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Server]),
		RolesModule,
		PermissionsModule
	],
	controllers: [
		ServersAdminController,
		ServersController
	],
	providers: [
		ServersService
	],
	exports: [ServersService]
})
export class ServersModule {
}
