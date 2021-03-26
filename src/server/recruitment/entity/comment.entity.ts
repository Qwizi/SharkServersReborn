import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../users/users.entity";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@ManyToOne(() => User, user => user.recruitment_comments)
	author: User

	@Column({
		type: 'text'
	})
	content: string;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;
}