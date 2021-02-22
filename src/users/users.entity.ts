import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Role} from "../roles/roles.entity";
import {Operation} from "../authenticator/operation.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    is_active: boolean;

    @Column({default: false})
    is_admin: boolean;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

    @OneToMany(() => Operation, operation => operation.user)
    operations: Operation[];

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}