import {DynamicModule, Global, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Permission} from "./permissions.entity";
import { PermissionsService } from './services/permissions.service';
import {PermissionModuleOptions} from "./permissions.types";
import {PERMISSIONS_OPTIONS} from "./permissions.constansts";

@Global()
@Module({})
export class PermissionsModule {
    static register(options: PermissionModuleOptions): DynamicModule {
        return {
            imports: [TypeOrmModule.forFeature([Permission])],
            module: PermissionsModule,
            providers: [
                {
                    provide: PERMISSIONS_OPTIONS,
                    useValue: options
                },
                PermissionsService
            ],
            exports: [PermissionsService]
        }
    }
}
