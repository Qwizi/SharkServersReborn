import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn
} from "typeorm";
import {Role} from "../roles/roles.entity";
import {Operation} from "../authenticator/operation.entity";
import {SteamProfile} from "../steamprofile/steamProfile.entity";
import {News} from "../news/news.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    display_name: string;

    @Column(({
        default: 'default_avatar.png'
    }))
    avatar: string;

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

    @OneToOne(() => SteamProfile, steamProfile => steamProfile.user)
    @JoinColumn()
    steam_profile: SteamProfile

    @OneToMany(() => News, news => news.owner)
    news: News[]

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}