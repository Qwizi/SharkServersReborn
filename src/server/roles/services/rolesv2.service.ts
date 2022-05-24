import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Perms } from "src/server/permissions/permissions.enum";
import { PermissionsService } from "src/server/permissions/services/permissions.service";
import { In, Repository } from "typeorm";
import { Role } from "../roles.entity";
import { DefaultRoles } from "../roles.enums";

@Injectable()
export class RolesV2Service extends TypeOrmCrudService<Role> implements OnModuleInit {
    private logger = new Logger(RolesV2Service.name);
    constructor(
        @InjectRepository(Role) repo: Repository<Role>,
        private permissionsService: PermissionsService
    ) {
        super(repo);
    }

    async onModuleInit() {
		this.logger.log('Rozpoczynam tworzenie domyslnych rol');
		await this.createDefaultRoles();
		this.logger.log('Zakonczylem tworzenie domyslynch rol')
	}

    async splitPermModule(permModule: string) {
		try {
			const permModuleSplit = permModule.split('.')
			const module = permModuleSplit[0]
			const value = permModuleSplit[1]
			return {
				module: module,
				value: value
			}
		} catch (e) {
			this.logger.error(e.message)
		}
	}

	async hasPerm(role: Role, permModule: string) {
		try {
			const permModuleSplit = await this.splitPermModule(permModule);
			const {module, value} = permModuleSplit;
			return !!role.permissions.find(perm => (perm.module == module && perm.value == value))
		} catch (e) {
			this.logger.error(e.message)
		}
	}

	async hasPerms(role: Role, permModule: string[]) {
		let has = false;
		for await (const perm of permModule) {
			has = await this.hasPerm(role, perm);
		}
		return has;
	}

	async createDefaultRoles() {
		const adminPermissions = await this.permissionsService.find();
		const usersPermissions = await this.permissionsService.find({
			where: [
				{
					module: 'profile',
					value: In([
						Perms.SHOW_PROFILE,
						Perms.CHANGE_EMAIL,
						Perms.CHANGE_USERNAME,
						Perms.CHANGE_PASSWORD
					])
				},
				{
					module: 'recruitment',
					value: In([
						Perms.CREATE_APPLICATION,
						Perms.CREATE_COMMENT,
					])
				}
			]
		})
		const adminRole = {
			name: DefaultRoles.Admin,
			color: 'red',
			permissions: adminPermissions
		};
		const userRole = {
			name: DefaultRoles.User,
			permissions: usersPermissions
		}

		const rolesToCreate = [adminRole, userRole];
		for await (const role of rolesToCreate) {
			if (!await this.repo.findOne({where: {name: role.name}})) {
				const newRole = await this.repo.create(role);
				this.logger.log(`${newRole.name} zostala stworzona`)
			}
		}
	}
    create(role: { name: any; permissions: any; }) {
        throw new Error("Method not implemented.");
    }
}