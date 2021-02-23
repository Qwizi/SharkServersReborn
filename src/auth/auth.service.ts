import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({where: {username: username}, relations: ['roles', 'operations']})
        if (user && await bcrypt.compare(password, user.password) && user.is_active) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
