import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../users/users.entity";
import {ApplicationStatus} from "../recruitment.enum";
import {RecruitmentPosition} from "./recruitmentPosition.entity";

@Entity()
export class RecruitmentApplication {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.recruitment_applications)
    author: User

    @ManyToOne(() => RecruitmentPosition, recruitmentPosition => recruitmentPosition.applications)
    position: RecruitmentPosition;

    @Column({
        type: "enum",
        enum: ApplicationStatus,
        default: ApplicationStatus.OPEN
    })
    status: string;

    @Column()
    age: number

    @Column()
    experience: string;

    @Column({
        type: 'text'
    })
    description: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}