import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Permission} from "../permissions/permissions.entity";
import {RecruitmentPosition} from "../recruitment/entity/recruitmentPosition.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: 'gray'})
    color: string;

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[];

    @OneToOne(() => RecruitmentPosition, recruitmentPosition => recruitmentPosition.role)
    recruitment_position: RecruitmentPosition;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}