import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
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
import {IsNotEmpty, IsNumber} from "class-validator";
import { CrudValidationGroups } from "@nestjsx/crud";

const { CREATE } = CrudValidationGroups;

@Entity()
export class RecruitmentPosition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: 0
    })
    free_space: number;

    @OneToOne(() => Role, role => role.recruitment_position)
    @JoinColumn()
    role: Role

    @OneToMany(() => RecruitmentApplication, recruitmentApplication => recruitmentApplication.position)
    applications: RecruitmentApplication[]


    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}