import { Injectable, OnModuleInit } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./roles.entity";
import {Repository} from "typeorm";
import {CreateRoleDto} from "./dto/createRole.dto";
import {PermissionsService} from "../permissions/permissions.service";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {Permission} from "../permissions/permissions.entity";
import {RemoveOptions} from "typeorm/browser";
import {UpdateRoleDto} from "./dto/updateRole.dto";

@Injectable()
export class RolesService implements OnModuleInit {
    constructor(
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
        private permissionsService: PermissionsService
    ) {}

    async onModuleInit() {
       
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
}
