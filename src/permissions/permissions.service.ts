import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CreatePermissionDto} from "./dto/createPermission.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./permissions.entity";
import {Repository} from "typeorm";
import {Perms} from "./permissions.enum";

@Injectable()
export class PermissionsService implements  OnModuleInit {
    private logger = new Logger(PermissionsService.name);

    constructor(
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    ) {}

    async onModuleInit() {
        this.logger.log("Dziala");
    }

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const newPermission = this.permissionRepository.create(createPermissionDto);
        await this.permissionRepository.save(newPermission);
        return newPermission;
    }
}
