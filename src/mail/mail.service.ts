import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {User} from "../users/users.entity";
import {Job, Queue} from "bull";
import {InjectQueue} from "@nestjs/bull";
import {Request} from "express";

@Injectable()
export class MailService implements OnModuleInit {
    private logger = new Logger(MailService.name);
    constructor(
        private mailerService: MailerService,
        @InjectQueue('mail') private mailQueue: Queue
    ) {}

    async onModuleInit() {
        this.logger.log('Testowy email');
    }

    async getAccountActivateUrl(req: Request, encryptedCode: string) {
        return `${req.protocol}://${req.get('host')}/activate-account/?code=${encryptedCode}`
    }

    async send(
        job: Job<unknown>,
        user?: User,
        code?: string,
        url?: string,
        subject?: string,
        template?: string,
        context?: object
        ) {
        return await this.mailerService.sendMail({
            to: user.email,
            from: "500adrian2@gmail.com",
            subject: subject,
            template: template,
            context: context
        })
    }

    async sendActivateAccountEmail(user: User, code: string, url: string) {
        const data = {
            user: user,
            code: code,
            url: url,
            subject: 'SharkServersReborn - Aktywacja konta',
            template: 'register',
            context: {
                url: url,
                code: code
            }
        };

        return await this.mailQueue.add(data, {
            delay: 3000,
            attempts: 3
        })
    }
}
