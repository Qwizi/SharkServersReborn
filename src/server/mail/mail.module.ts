import { Module } from '@nestjs/common';
//import {MailerModule} from "@nestjs-modules/mailer";
//import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailConsumer } from './mail.consumer';
import { MailerModule } from '@derech1e/mailer';
import { PugAdapter } from '@derech1e/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.registerQueue({
      name: 'mail',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        //security: 'STARTTLS',
        //secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService, MailConsumer],
  exports: [MailService],
})
export class MailModule {}
