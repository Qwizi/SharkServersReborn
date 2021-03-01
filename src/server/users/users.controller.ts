import {Controller, Get} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthenticatorService} from "../authenticator/authenticator.service";
import {MailService} from "../mail/mail.service";
import {Operations} from "../authenticator/operations.enums";

@Controller('api/users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authenticatorService: AuthenticatorService,
        private mailService: MailService
    ) {}

}
