import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../users/users.entity";
import {ApplicationStatus, PositionType} from "../recruitment.enum";
import {Role} from "../../roles/roles.entity";
import {IsNotEmpty, IsNumber} from "class-validator";
import { CrudValidationGroups } from "@nestjsx/crud";
import {Question} from "./question.entity";
import {PositionQuestionAnswer} from "./positionQuestionAnswer.entity";
import {Application} from "./application.entity";

const { CREATE } = CrudValidationGroups;

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: 0
    })
    free_space: number;

    @IsNotEmpty()
    @OneToOne(() => Role, role => role.recruitment_position)
    @JoinColumn()
    role: Role

    @IsNotEmpty()
    @OneToMany(() => Question, question => question.position)
    @JoinColumn()
    questions: Question[]

    @OneToMany(() => Application, application => application.position)
    @JoinColumn()
    applications: Application[]

    @Column({
        type: "enum",
        enum: PositionType,
        default: PositionType.RECRUITMENT
    })
    type: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}