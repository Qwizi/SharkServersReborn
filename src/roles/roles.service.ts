import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./roles.entity";
import {In, Repository} from "typeorm";
import {CreateRoleDto} from "./dto/createRole.dto";
import {PermissionsService} from "../permissions/permissions.service";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {RemoveOptions} from "typeorm/browser";
import {UpdateRoleDto} from "./dto/updateRole.dto";
import {DefaultRoles} from "./roles.enums";
import {Perms} from "../permissions/permissions.enum";

@Injectable()
export class RolesService implements OnModuleInit {
    private logger = new Logger(RolesService.name);
    constructor(
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
        private permissionsService: PermissionsService
    ) {}

    async onModuleInit() {
        this.logger.log('Rozpoczynam tworzenie domyslnych rol');
        await this.createDefaultRoles();
        this.logger.log('Zakonczylem tworzenie domyslynch rol')
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role | undefined> {
        const newRole = this.rolesRepository.create(createRoleDto);
        await this.rolesRepository.save(newRole);
        return newRole;
    }

    async find(options?: FindManyOptions): Promise<Role[] | []> {
        return this.rolesRepository.find(options);
    }

    async findOne(options?: FindOneOptions<Role>): Promise<Role | undefined> {
        return this.rolesRepository.findOne(options);
    }

    async update(role: Role, updateRoleDto: UpdateRoleDto): Promise<Role> {
        role.name = updateRoleDto.name || role.name;
        role.color = updateRoleDto.color || role.color;
        role.permissions = updateRoleDto.permissions || role.permissions;
        await this.rolesRepository.save(role);
        return role;
    }

    async remove(entity: Role, options?: RemoveOptions): Promise<any> {
        return options ? this.rolesRepository.remove(entity, options) : this.rolesRepository.remove(entity);
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
            where: {
                module: 'profile',
                value: In([
                    Perms.SHOW_PROFILE,
                    Perms.CHANGE_EMAIL,
                    Perms.CHANGE_USERNAME,
                    Perms.CHANGE_PASSWORD
                ])
            }
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
            if (!await this.findOne({where: {name: role.name}})) {
                const newRole = await this.create(role);
                this.logger.log(`${newRole.name} zostala stworzona`)
            } else {
                this.logger.log(`${role.name} juz istnieje w naszej bazie`)
            }
        }
    }
}
