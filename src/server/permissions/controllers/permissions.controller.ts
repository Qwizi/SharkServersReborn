import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Permission } from '../permissions.entity';
import { PermissionsV2Service } from '../services/permissionsv2.service';

@ApiTags('permissions')
@Crud({
  model: {
    type: Permission,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
@Controller({
  version: '2',
  path: 'permissions',
})
export class PermissionsController implements CrudController<Permission> {
  constructor(public service: PermissionsV2Service) {}
}
