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
        const user = await this.usersService.findOne({where: {username: username}, relations: ['roles']})
        if (user && await bcrypt.compare(password, user.password) && user.is_active) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async registerUser(registerUserDto: RegisterUserDto, req: Request): Promise<any> {
        const newUser = await this.usersService.register(registerUserDto);
        const [code, encryptedCode] = await this.createActivateCode(newUser);
        const url = await this.getAccountActivateUrl(req, encryptedCode);
        const job = await this.mailService.sendActivateAccountEmail(newUser, code, url);
        const {password, ...result} = newUser;
        return result
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
        return `${req.protocol}://${req.get('host')}/activate-account/?code=${encryptedCode}`
    }
}
