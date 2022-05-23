import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import { MailerService } from '@derech1e/mailer';
import {User} from "../users/entity/users.entity";
import {Job, Queue} from "bull";
import {InjectQueue} from "@nestjs/bull";
import {Request} from "express";

@Injectable()
export class MailService implements OnModuleInit {
    private logger = new Logger(MailService.name);

    constructor(
        private mailerService: MailerService,
        @InjectQueue('mail') private mailQueue: Queue
    ) {
    }

    async onModuleInit() {
        this.logger.log('Testowy email');
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

    async addToQueue(data: object, options?: object) {
        return options
            ? await this.mailQueue.add(data, options)
            : await this.mailQueue.add(data, {
                delay: 3000,
                attempts: 3
            })
    }

    async sendActivateAccountEmail(user: User, code: string, url: string) {
        return this.addToQueue({
            user: user,
            code: code,
            url: url,
            subject: 'SharkServersReborn - Aktywacja konta',
            template: 'register',
            context: {
                url: url,
                code: code
            }
        });
    }

    async sendResetPasswordEmail(user: User, code: string, url: string) {
        return this.addToQueue({
            user: user,
            url: url,
            code: code,
            subject: 'SharkServersReborn - Reset hasła',
            template: 'reset-password',
            context: {url: url}
        })
    }

    async sendChangeEmail(user: User, code: string, url: string) {
        return this.addToQueue({
            user: user,
            url: url,
            code: code,
            subject: 'SharkServersReborn - Zmiana emaila',
            template: 'change-email',
            context: {url: url}
        })
    }

    async getUrl(req: Request) {
        return `${req.protocol}://${req.get('host')}`;
    }

    async getAccountActivateUrl(req: Request, encryptedCode: string) {
        const url = await this.getUrl(req);
        return `${url}/activate-account/?code=${encryptedCode}`
    }

    async getResetPasswordUrl(req: Request, encryptedCode: string) {
        const url = await this.getUrl(req);
        return `${url}/reset-password/?code=${encryptedCode}`
    }

    async getChangeEmailUrl(req: Request, encryptedCode: string, email: string) {
        const url = await this.getUrl(req);
        return `${url}/profile/email/?email=${email}&?code=${encryptedCode}`
    }
}
