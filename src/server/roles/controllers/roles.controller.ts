import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Role } from '../roles.entity';
import { RolesV2Service } from '../services/rolesv2.service';

@ApiTags('roles')
@Crud({
  model: {
    type: Role,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
@Controller({
  version: '2',
  path: 'roles',
})
export class RolesController implements CrudController<Role> {
  constructor(public service: RolesV2Service) {}
}
