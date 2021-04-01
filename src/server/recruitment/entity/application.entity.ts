import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Position} from "./position.entity";
import {Question} from "./question.entity";
import {User} from "../../users/entity/users.entity";
import {SteamProfile} from "../../steamprofile/steamProfile.entity";
import {IsNotEmpty, IsString} from "class-validator";
import {PositionQuestionAnswer} from "./positionQuestionAnswer.entity";
import {Comment} from "./comment.entity";
import {ApplicationStatus, PositionType} from "../recruitment.enum";

@Entity()
export class Application {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => User, user => user.applications)
	author: User

	@ManyToOne(() => SteamProfile)
	steam_profile: SteamProfile

	@ManyToOne(() => Position, position => position.applications)
	position: Position

	@OneToMany(() => PositionQuestionAnswer, positionQuestionAnswer => positionQuestionAnswer.application)
	questions_answers: PositionQuestionAnswer[]

	@OneToMany(() => Comment, comment => comment.application)
	comments: Comment[]

	@Column({
		type: "enum",
		enum: ApplicationStatus,
		default: ApplicationStatus.OPEN
	})
	status: string;
}