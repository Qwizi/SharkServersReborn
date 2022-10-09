import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Controller, UseGuards } from '@nestjs/common';
import { Server } from '../entity/server.entity';
import { ServersService } from '../services/servers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('servers')
@Crud({
  model: {
    type: Server,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    alwaysPaginate: true,
    join: {
      admin_role: {},
      maintainer_role: {},
    },
  },
})
@Controller('servers')
export class ServersController implements CrudController<Server> {
  constructor(public service: ServersService) {}
}
