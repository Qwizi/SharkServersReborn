import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {UsersModule} from "../users/users.module";
import {AuthenticatorModule} from "../authenticator/authenticator.module";
import {MailModule} from "../mail/mail.module";

@Module({
  imports: [
      UsersModule,
      AuthenticatorModule,
      MailModule
  ],
  controllers: [],
  providers: [ProfileService]
})
export class ProfileModule {}
