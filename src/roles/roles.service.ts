import { Injectable, OnModuleInit } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./roles.entity";
import {Repository} from "typeorm";
import {CreateRoleDto} from "./dto/createRole.dto";
import {PermissionsService} from "../permissions/permissions.service";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {Permission} from "../permissions/permissions.entity";

@Injectable()
export class RolesService implements OnModuleInit {
    constructor(
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
        private permissionsService: PermissionsService
    ) {}

    async onModuleInit() {
        const role = await this.findOne({where: {id: 1}, relations: ['permissions']});
        console.log(role);
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
}
