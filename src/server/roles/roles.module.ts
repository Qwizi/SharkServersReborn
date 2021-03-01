import {Global, Module} from '@nestjs/common';
import { RolesService } from './roles.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./roles.entity";
import {PermissionsModule} from "../permissions/permissions.module";

@Global()
@Module({
  imports: [
      TypeOrmModule.forFeature([Role]),
      PermissionsModule
  ],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
