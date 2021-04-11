import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Server} from "./server.entity";
import {SteamProfile} from "../../steamprofile/steamProfile.entity";
import {PlayerStats} from "./playerStats.entity";

@Entity()
export class Player {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Server, server => server.players, {
		cascade: true
	})
	server: Server;

	@ManyToOne(() => SteamProfile, steamProfile => steamProfile.players, {
		cascade: true
	})
	steam_profile: SteamProfile;

	@OneToMany(() => PlayerStats, playerStats => playerStats.player)
	stats: PlayerStats[]
}