import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '../entity/users.entity';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    exclude: ['password', 'email'],
    alwaysPaginate: true,
    join: {
      steam_profile: {},
      roles: {},
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
