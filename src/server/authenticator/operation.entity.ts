import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../users/entity/users.entity";
import {Operations} from "./operations.enums";

// @ts-ignore
@Entity()
export class Operation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column({
        type: "enum",
        enum: Operations,
        default: Operations.CONFIRM_EMAIL
    })
    type: string;

    @ManyToOne(() => User, (user: User) => user.operations)
    user: User

    @Column({default: true})
    is_active: boolean;
}