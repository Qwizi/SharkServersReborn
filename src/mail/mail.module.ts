import {Module} from '@nestjs/common';
import {MailerModule} from "@nestjs-modules/mailer";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import {MailService} from './mail.service';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                //security: 'STARTTLS',
                //secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            },
            preview: false,
            template: {
                dir: process.cwd() + '/templates/',
                adapter: new PugAdapter(),
                options: {
                    strict: true
                }
            }
        })],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
