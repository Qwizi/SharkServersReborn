import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {UsersModule} from "../users/users.module";
import {AuthController} from './auth.controller';
import {SessionSerializer} from "./sessions.serializer";
import {MailModule} from "../mail/mail.module";
import {AuthenticatorModule} from "../authenticator/authenticator.module";
import {APP_GUARD} from "@nestjs/core";
import {PermissionsGuard} from "./guards/permissions.guard";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({session: true}),
        AuthenticatorModule,
        MailModule
    ],
    providers: [
        AuthService,
        LocalStrategy,
        SessionSerializer,
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard
        }
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {
}
