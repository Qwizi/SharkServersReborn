import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Position} from "./position.entity";
import {Question} from "./question.entity";
import {User} from "../../users/users.entity";
import {SteamProfile} from "../../steamprofile/steamProfile.entity";
import {IsNotEmpty, IsString} from "class-validator";
import {PositionQuestionAnswer} from "./positionQuestionAnswer.entity";

@Entity()
export class Application {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@ManyToOne(() => User, user => user.applications)
	author: User

	@ManyToOne(() => SteamProfile)
	steam_profile: SteamProfile

	@ManyToOne(() => Position, position => position.applications)
	position: Position

	@OneToMany(() => PositionQuestionAnswer, positionQuestionAnswer => positionQuestionAnswer.application)
	questions_answers: PositionQuestionAnswer[]
}