import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/entity/users.entity';
import { Player } from '../servers/entity/player.entity';

@Entity()
export class SteamProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({
    unique: true,
  })
  steamid64: string;

  @Column({
    unique: true,
  })
  steamid32: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  avatar_medium: string;

  @Column({
    nullable: true,
  })
  avatar_full: string;

  @Column()
  url: string;

  @OneToOne(() => User, (user) => user.steam_profile)
  user: User;

  @OneToMany(() => Player, (player) => player.steam_profile)
  players: Player[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
