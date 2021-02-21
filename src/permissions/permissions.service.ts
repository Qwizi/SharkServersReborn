import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CreatePermissionDto} from "./dto/createPermission.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./permissions.entity";
import {Repository} from "typeorm";
import {Perms} from "./permissions.enum";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOptions} from "@nestjs/schematics";
import {ObjectID} from "typeorm/driver/mongodb/typings";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

@Injectable()
export class PermissionsService implements OnModuleInit {
    private logger = new Logger(PermissionsService.name);

    constructor(
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    ) {
    }

    async onModuleInit() {
        this.logger.log("Dziala");
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
}
