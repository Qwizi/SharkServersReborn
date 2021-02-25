import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {User} from "../users/users.entity";
import {Job, Queue} from "bull";
import {InjectQueue} from "@nestjs/bull";

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

    async send(
        job: Job<unknown>,
        user?: User,
        code?: string,
        url?: string,
        subject?: string,
        template?: string,
        context?: object
        ) {
        await job.progress(50);
        return this.mailerService.sendMail({
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
        return this.mailQueue.add(data)
        /*return this.mailerService.sendMail({
            to: user.email,
            from: "500adrian2@gmail.com",
            subject: 'SharkServersReborn - Aktywacja konta',
            template: 'register',
            context: {
                url: url,
                code: code
            }
        })*/
    }
}
