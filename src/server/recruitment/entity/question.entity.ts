import {
	Column,
	Entity, ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Position} from "./position.entity";
import {ApplicationStatus, QuestionAnswerType} from "../recruitment.enum";

@Entity()
export class Question {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({
		type: "enum",
		enum: QuestionAnswerType,
		default: QuestionAnswerType.TEXT
	})
	type: string;

	@Column({
		type: "text"
	})
	question: string;

	@ManyToOne(() => Position, position => position.questions)
	position: Position
}