import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Player } from '../entity/player.entity';

export class CreatePlayerStatsDto {
  @ValidateNested()
  player: Player;
}
