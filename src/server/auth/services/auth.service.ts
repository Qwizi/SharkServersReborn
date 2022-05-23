import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from "../../users/services/users.service";
import * as bcrypt from 'bcrypt';
import {RegisterUserDto} from "../../users/dto/registerUser.dto";
import {MailService} from "../../mail/mail.service";
import {AuthenticatorService} from "../../authenticator/services/authenticator.service";
import {Request} from "express";
import {SteamProfileService} from "../../steamprofile/steamProfile.service";
import {User} from "../../users/entity/users.entity";
import {DisconnectAccountDto} from "../dto/disconnectAccount.dto";
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private mailService: MailService,
        private authenticatorService: AuthenticatorService,
        private steamProfileService: SteamProfileService,
    ) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({
            where: {
                username: username
            },
            relations:
                [
                    'roles',
                    'roles.permissions',
                    'steam_profile'
                ]
        })
        if (user && await bcrypt.compare(password, user.password) && user.is_active) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async registerUser(registerUserDto: RegisterUserDto, req: Request): Promise<any> {
        const newUser = await this.usersService.register(registerUserDto);
        const [code, encryptedCode] = await this.authenticatorService.createCode(newUser);
        const url = await this.mailService.getAccountActivateUrl(req, encryptedCode);
        const job = await this.mailService.sendActivateAccountEmail(newUser, code, url);
        const {password, ...result} = newUser;
        return result
    }

    async connectSteamAccount(user, profile) {
        const {steamid} = profile._json
        console.log(steamid);
        const steamProfileExist = await this.steamProfileService.findOne({where: {steamid64: steamid}})
        console.log(steamProfileExist);
        if (steamProfileExist) {
            await this.usersService.update(user, {steam_profile: steamProfileExist})
        } else {
            const newSteamProfile = await this.steamProfileService.create({steamid64: steamid});
            console.log(newSteamProfile);
            await this.usersService.update(user, {steam_profile: newSteamProfile})
        }
        return user;
    }

    async disconnectAccount(user: User, disconnectAccountDto: DisconnectAccountDto) {
        const {account} = disconnectAccountDto;
        console.log(account);
        switch (account) {
            case 'steam':
                console.log(user);
                await this.usersService.update(user, {steam_profile: null})
                break;
        }
    }
}
