import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import {MailerService} from "@nestjs-modules/mailer";
import {MailService} from "./mail.service";
import {Logger} from "@nestjs/common";

@Processor('mail')
export class MailConsumer {
    private logger = new Logger(MailConsumer.name);
    constructor(
        private mailService: MailService
    ) {}
    @Process()
    async send(job: Job<unknown>) {
        this.logger.log('Rozpoczynam wysylanie emaila')
        await job.progress(10);
        const {data} = job;
        this.logger.log(`Dane -> ${JSON.stringify(data)}`)
        // @ts-ignore
        const user = data.user || _0;
        // @ts-ignore
        const code = data.code || _1;
        // @ts-ignore
        const url = data.url || _2;
        // @ts-ignore
        const subject = data.subject;
        // @ts-ignore
        const template = data.template;
        // @ts-ignore
        const context = data.context || null;
        await this.mailService.send(
            job,
            user,
            code,
            url,
            subject,
            template,
            context
        );
        await job.progress(100);
        this.logger.log('Zakonczylem wysylanie emaila');
        return {};
    }
}