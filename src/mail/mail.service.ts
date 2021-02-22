import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {User} from "../users/users.entity";

@Injectable()
export class MailService implements OnModuleInit {
    private logger = new Logger(MailService.name);
    constructor(
        private mailerService: MailerService
    ) {}

    async onModuleInit() {
        this.logger.log('Testowy email');
    }

    async sendEmailConfirmEmail(user: User, code: string) {
        return this.mailerService.sendMail({
            to: "qwizi95@protonmail.com",
            from: "500adrian2@gmail.com",
            subject: 'SharkServersReborn - Aktywacja konta',
            template: 'register',
            context: {code: code}
        })
    }
}
