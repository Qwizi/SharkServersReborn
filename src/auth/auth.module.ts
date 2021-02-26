import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {UsersModule} from "../users/users.module";
import { AuthController } from './auth.controller';
import {SessionSerializer} from "./sessions.serializer";
import {MailModule} from "../mail/mail.module";
import {AuthenticatorModule} from "../authenticator/authenticator.module";

@Module({
  imports: [
      UsersModule,
      PassportModule.register({session: true}),
      AuthenticatorModule,
      MailModule
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
