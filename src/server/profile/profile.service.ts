import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/entity/users.entity";
import {ChangePasswordDto} from "./dto/changePassword.dto";
import {ChangeUsernameDto} from "./dto/changeUsername.dto";
import {Operations} from "../authenticator/operations.enums";
import {AuthenticatorService} from "../authenticator/authenticator.service";
import {MailService} from "../mail/mail.service";
import {Request} from "express";
import {ChangeEmailDto} from "./dto/changeEmail.dto";

@Injectable()
export class ProfileService {
    private logger = new Logger(ProfileService.name);
    constructor(
        private readonly usersService: UsersService,
        private readonly authenticatorService: AuthenticatorService,
        private readonly mailService: MailService,
    ) {}

    async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
        const user = await this.usersService.findOne({where: {id: userId}})
        const {old_password, new_password, new_password_confirm} = changePasswordDto;
        const expression = !await this.usersService.comparePassword(old_password, user.password) && new_password !== new_password_confirm;
        if (expression) throw new BadRequestException();
        const newPasswordHashed = await this.usersService.createHashedPassword(new_password);
        await this.usersService.update(user, {password: newPasswordHashed})
    }

    async changeUsername(user: User, changeUsernameDto: ChangeUsernameDto) {
        const {username} = changeUsernameDto;
        const usernameExists = await this.usersService.findOne({where: {display_name: username}})
        if (usernameExists) throw new BadRequestException('This username is already taken')
        await this.usersService.update(user, {display_name: username})
    }

    async sendChangeEmail(userId: number, req: Request, changeEmailDto: ChangeEmailDto) {
        try {
            const user = await this.usersService.findOne({where: {id: userId}, relations: ['operations']})
            const {email} = changeEmailDto;
            const emailIsTaken = await this.usersService.findOne({where: {email: email}})
            if (emailIsTaken) throw new BadRequestException('Email is taken')
            await this.authenticatorService.deactivateConfirmCodes(user, Operations.CONFIRM_CHANGE_EMAIL);
            const [code, encryptedCode] = await this.authenticatorService.createCode(user, Operations.CONFIRM_CHANGE_EMAIL);
            const url = await this.mailService.getChangeEmailUrl(req, encryptedCode, email);
            const job = await this.mailService.sendChangeEmail(user, code, url);
        } catch (e) {this.logger.error(e.message)}
    }

    async changeEmail(user: User, email: string, encryptedCode: string) {
        try {
            const decryptedCode = await this.authenticatorService.decryptCode(encryptedCode);
            const [isValidCode, operation] = await this.authenticatorService.checkCode(decryptedCode, true, Operations.CONFIRM_CHANGE_EMAIL)
            if (!isValidCode) throw new BadRequestException('Not validated code')
            await this.usersService.update(user, {email: email})
        } catch (e) {this.logger.error(e.message)}
    }
}
