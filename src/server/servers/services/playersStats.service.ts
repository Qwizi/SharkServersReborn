import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entity/player.entity';
import { PlayerStats } from '../entity/playerStats.entity';
import { CreatePlayerStatsDto } from '../dto/createPlayerStats.dto';

@Injectable()
export class PlayersStatsService
  extends TypeOrmCrudService<PlayerStats>
  implements OnModuleInit
{
  private logger = new Logger(PlayersStatsService.name);

  constructor(@InjectRepository(PlayerStats) public repo) {
    super(repo);
  }

  async onModuleInit() {
    const date = new Date().toLocaleDateString();
    this.logger.log(date);
  }

  async _create() {
    const now = new Date().toLocaleDateString();
    const playerStats = await this.repo.create({
      date: now,
    });
    await this.repo.save(playerStats);
    return playerStats;
  }
}
