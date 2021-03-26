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
import {Position} from "../recruitment/entity/position.entity";

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

    @OneToOne(() => Position, recruitmentPosition => recruitmentPosition.role)
    recruitment_position: Position;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}