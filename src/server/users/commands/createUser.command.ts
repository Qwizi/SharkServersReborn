import {Command, Positional, Option} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {UsersService} from '../services/users.service';

@Injectable()
export class CreateUserCommand {
	constructor(private readonly usersService: UsersService) {
	}

	@Command({
		command: 'create:user <username>',
		describe: 'create a user',
		autoExit: true
	})
	async createUser(
		@Positional({
			name: 'username',
			describe: 'username',
			type: 'string',
			alias: 'u'
		})
			username: string,
		@Option({
			name: 'email',
			describe: 'email',
			type: 'string',
			alias: 'e',
			required: true
		})
			email: string,
		@Option({
			name: 'password',
			describe: 'password',
			type: 'string',
			alias: 'p',
			required: true
		})
			password: string,
		@Option({
			name: 'admin',
			describe: 'is admin',
			type: 'boolean',
			alias: 'ad',
			default: false,
			required: false
		})
			isAdmin: boolean
	) {
		await this.usersService.register({
			username: username,
			email: email,
			password: password
		}, true, isAdmin)
	}
}