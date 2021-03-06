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
import {SteamProfileModule} from "../steamprofile/steamProfile.module";
import {SteamStrategy} from "./strategies/steam.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({session: true}),
        AuthenticatorModule,
        MailModule,
        SteamProfileModule
    ],
    providers: [
        AuthService,
        SteamStrategy,
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
