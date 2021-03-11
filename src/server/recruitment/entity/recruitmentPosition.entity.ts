import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../users/users.entity";
import {ApplicationStatus} from "../recruitment.enum";
import {Role} from "../../roles/roles.entity";
import {RecruitmentApplication} from "./recruitmentApplication.entity";

@Entity()
export class RecruitmentPosition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: 0
    })
    free_space: number;

    @OneToOne(() => Role, role => role.recruitment_position)
    role: Role

    @OneToMany(() => RecruitmentApplication, recruitmentApplication => recruitmentApplication.position)
    applications: RecruitmentApplication[]


    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}