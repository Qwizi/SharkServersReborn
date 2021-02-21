import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CreatePermissionDto} from "./dto/createPermission.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./permissions.entity";
import {Repository} from "typeorm";
import {Perms} from "./permissions.enum";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {ObjectID} from "typeorm/driver/mongodb/typings";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {FindConditions} from "typeorm/find-options/FindConditions";
import {RemoveOptions} from "typeorm/repository/RemoveOptions";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {UpdatePermissionDto} from "./dto/updatePermission.dto";

@Injectable()
export class PermissionsService implements OnModuleInit {
    private logger = new Logger(PermissionsService.name);

    constructor(
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    ) {
    }

    async onModuleInit() {
        this.logger.log("Dziala");
        if (!await this.findOne({where: {module: 'test'}})) {
            const testperm = await this.create({module: 'test', value: Perms.SERVICE_CREATE})
            const updatedPerm = await this.update(testperm, {value: Perms.SERVICE_UPDATE})
            console.log(updatedPerm);
        }
    }

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission | undefined> {
        const newPermission = this.permissionRepository.create(createPermissionDto);
        await this.permissionRepository.save(newPermission);
        return newPermission;
    }

    async find(options?: FindManyOptions): Promise<Permission[] | []> {
        return this.permissionRepository.find(options);
    }

    async findOne(options?: FindOneOptions<Permission>): Promise<Permission | undefined> {
        return this.permissionRepository.findOne(options);
    }

    async findOneById(id?: string | number | Date | ObjectID): Promise<Permission | undefined> {
        return this.permissionRepository.findOne(id);
    }

    async update(permission: Permission, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
        permission.module = updatePermissionDto.module || permission.module;
        permission.value = updatePermissionDto.value || permission.value;
        await this.permissionRepository.save(permission);
        return permission;
    }

    async remove(entity: Permission, options?: RemoveOptions): Promise<any> {
        return options ? this.permissionRepository.remove(entity, options) : this.permissionRepository.remove(entity);
    }
}
