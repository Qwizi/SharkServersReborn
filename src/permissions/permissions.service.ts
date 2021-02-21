import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CreatePermissionDto} from "./dto/createPermission.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./permissions.entity";
import {Repository} from "typeorm";
import {Perms} from "./permissions.enum";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";

@Injectable()
export class PermissionsService implements OnModuleInit {
    private logger = new Logger(PermissionsService.name);

    constructor(
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    ) {
    }

    async onModuleInit() {
        this.logger.log("Dziala");
        console.log(await this.find({where: {module: 'test'}}));
        if (!await this.permissionRepository.findOne({where: {module: 'test'}})) {
            const newPerm = await this.create({module: 'test', value: Perms.SERVICE_CREATE});
        }
        const perms = await this.find();
        this.logger.log(`${perms.join(',')}`)
    }

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const newPermission = this.permissionRepository.create(createPermissionDto);
        await this.permissionRepository.save(newPermission);
        return newPermission;
    }

    async find(options?: FindManyOptions): Promise<Permission[]> {
        return this.permissionRepository.find(options);
    }
}
