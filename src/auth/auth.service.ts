import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {User} from "../users/users.entity";
import {RegisterUserDto} from "../users/dto/registerUser.dto";
import {MailService} from "../mail/mail.service";
import {AuthenticatorService} from "../authenticator/authenticator.service";
import {Operations} from "../authenticator/operations.enums";
import {Request} from "express";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private mailService: MailService,
        private authenticatorService: AuthenticatorService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({where: {username: username}, relations: ['roles', 'operations']})
        if (user && await bcrypt.compare(password, user.password) && user.is_active) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        return this.usersService.register(registerUserDto);
    }

    async sendVerificationEmail(user: User, code: string, url: string) {
        return this.mailService.sendActivateAccountEmail(user, code, url);
    }

    async createActivateCode(user: User) {
        const [code, operation] = await this.authenticatorService.createCode({
            user: user,
            type: Operations.CONFIRM_EMAIL
        })
        const encryptedCode = await this.authenticatorService.encryptCode(code);
        return [code, encryptedCode]
    }

    async getAccountActivateUrl(req: Request, encryptedCode: string) {
        return `${req.protocol}://${req.get('host')}/auth/account-activate/${encryptedCode}`
    }
}
