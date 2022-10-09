import { Global, Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesController } from './controllers/roles.controller';
import { RolesV2Service } from './services/rolesv2.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role]), PermissionsModule],
  providers: [RolesService, RolesV2Service],
  exports: [RolesService, RolesV2Service],
  controllers: [RolesController],
})
export class RolesModule {}
