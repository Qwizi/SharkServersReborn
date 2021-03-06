import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}