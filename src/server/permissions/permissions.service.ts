import {Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CreatePermissionDto} from "./dto/createPermission.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./permissions.entity";
import {Repository} from "typeorm";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {ObjectID} from "typeorm/driver/mongodb/typings";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {RemoveOptions} from "typeorm/repository/RemoveOptions";
import {UpdatePermissionDto} from "./dto/updatePermission.dto";
import {PermissionModuleOptions} from "./permissions.types";
import {PERMISSIONS_OPTIONS} from "./permissions.constansts";

@Injectable()
export class PermissionsService implements OnModuleInit {
    private logger = new Logger(PermissionsService.name);

    constructor(
        @Inject(PERMISSIONS_OPTIONS) private options: PermissionModuleOptions,
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    ) {
    }

    async onModuleInit() {
        this.logger.log("Dziala");
        await this.createPermissionsFromAppModule();
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

    async findOneByPermModule(permModule: string): Promise<Permission | undefined> {
        try {
            const splitPerm = permModule.split('.');
            const module = splitPerm[0]
            const permission = splitPerm[1]
            return this.findOne({where: {module: module, value: permission}});
        } catch (e) {
            this.logger.error(e.message);
        }
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

    async createPermissionsFromAppModule() {
        try {
            const {modules} = this.options;
            this.logger.log('Zaczynam tworzyc uprawnienia');
            for await (const module of modules) {
                // Zamieniamy duze litery na male oraz osuwamy slowo module
                const moduleName = module.module.toLowerCase().replace('module', '');
                const {permissions} = module;
                for await (const permission of permissions) {
                    if (!await this.findOne({where: {module: moduleName, value: permission}})) {
                        const newPerm = await this.create({module: moduleName, value: permission});
                        this.logger.log(`[${moduleName}] dodano uprawnienie <${newPerm.value}>`);
                    }
                }
            }
            this.logger.log('Zakończyłem tworzyć uprawnienia');
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}
