import {Injectable, Logger} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Server} from "../entity/server.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RolesService} from "../../roles/services/roles.service";
import {CreateServerDto} from "../dto/createServer.dto";
import {PermissionsService} from "../../permissions/services/permissions.service";

@Injectable()
export class ServersService extends TypeOrmCrudService<Server> {
	private logger = new Logger(ServersService.name);

	constructor(
		@InjectRepository(Server) repo,
		private rolesService: RolesService,
		private permissionsService: PermissionsService
	) {
		super(repo);
	}

	async _createRoles(serverName: string) {
		const roles = [
			{
				name: `Admin ${serverName}`,
				color: '#c18c0c'
			},
			{
				name: `Opiekun ${serverName}`,
				color: '#654ef2'
			}
		]
		const roleEntities = [];
		for await (let role of roles) {
			if (!await this.rolesService.findOne({where: {name: role.name}})) {
				const newRole = await this.rolesService.create({
					name: role.name,
					color: role.color
				})
				roleEntities.push(newRole)
			}
		}
		return roleEntities;
	}

	async _create(dto: CreateServerDto) {
		const {name, ip, port} = dto;
		const server = await this.repo.create({
			name: name,
			ip: ip,
			port: port
		})
		const [adminRole, maintainerRole] = await this._createRoles(name);
		server.admin_role = adminRole;
		server.maintainer_role = maintainerRole
		await this.repo.save(server);
		return server
	}
}
