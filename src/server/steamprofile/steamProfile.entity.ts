import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../users/users.entity";

@Entity()
export class SteamProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column({
        unique: true
    })
    steamid64: string;

    @Column({
        unique: true
    })
    steamid32: string;

    @Column()
    avatar: string;

    @Column()
    avatar_medium: string;

    @Column()
    avatar_full: string;

    @Column()
    url: string

    @OneToOne(() => User, user => user.steam_profile)
    user: User

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}