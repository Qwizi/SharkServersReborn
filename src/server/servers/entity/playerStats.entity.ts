import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Player} from "./player.entity";

@Entity()
export class PlayerStats {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Player, player => player.stats)
	player: Player;

	@Column({
		default: 0
	})
	minutes: number

	@Column({
		default: 0
	})
	points: number;

	@Column({
		default: 0
	})
	kills: number;

	@Column({
		default: 0
	})
	deaths: number;

	@Column({
		type: "date"
	})
	public date: Date;
}
