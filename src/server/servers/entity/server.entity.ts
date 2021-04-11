import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../../roles/roles.entity";

@Entity()
export class Server {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	ip: string;

	@Column()
	port: number;

	@OneToOne(() => Role, role => role.server_admin)
	@JoinColumn()
	admin_role: Role

	@OneToOne(() => Role, role => role.server_maintainer)
	@JoinColumn()
	maintainer_role: Role

}