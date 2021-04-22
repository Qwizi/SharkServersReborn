import {Command, Positional, Option} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import { ServersService } from '../services/servers.service';

@Injectable()
export class CreateServerCommand {
	constructor(private readonly serversService: ServersService) {
	}

	@Command({
		command: 'create:server <name>',
		describe: 'create a server',
		autoExit: true
	})
	async createUser(
		@Positional({
			name: 'name',
			describe: 'name',
			type: 'string',
			alias: 'm'
		})
			name: string,
		@Option({
			name: 'ip',
			describe: 'ip',
			type: 'string',
			alias: 'i',
			required: true
		})
			ip: string,
		@Option({
			name: 'port',
			describe: 'port',
			type: 'number',
			alias: 'p',
			required: true
		})
			port: number
	) {
		await this.serversService._create({
            ip: ip,
            name: name,
            port: port
        })
	}
}