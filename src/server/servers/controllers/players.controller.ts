import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Server } from '../entity/server.entity';
import { ServersService } from '../services/servers.service';
import { Player } from '../entity/player.entity';
import { PlayersService } from '../services/players.service';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { CreateServerDto } from '../dto/createServer.dto';
import { CreatePlayerDto } from '../dto/createPlayer.dto';
import { Perms } from '../../auth/decorators/permissions.decorator';
import { ApplicationStatus } from '../../recruitment/recruitment.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('servers-players')
@Crud({
  model: {
    type: Player,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    alwaysPaginate: true,
    join: {
      server: {
        eager: true,
      },
      steam_profile: {
        eager: true,
      },
      stats: {},
    },
  },
})
@Controller('servers-players')
export class PlayersController implements CrudController<Player> {
  constructor(public service: PlayersService) {}
}
