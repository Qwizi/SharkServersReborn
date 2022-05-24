import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { PERMISSIONS_OPTIONS } from "../permissions.constansts";
import { Permission } from "../permissions.entity";
import { PermissionModuleOptions } from "../permissions.types";

@Injectable()
export class PermissionsV2Service extends TypeOrmCrudService<Permission> implements OnModuleInit {
    private logger = new Logger(PermissionsV2Service.name)
    
    constructor(
        @Inject(PERMISSIONS_OPTIONS) private options: PermissionModuleOptions,
        @InjectRepository(Permission) repo: Repository<Permission>
    ) { super(repo)}
    
    async onModuleInit() {
        await this.createPermissionsFromAppModule();
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
                        const newPerm = await this.repo.create({module: moduleName, value: permission});
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