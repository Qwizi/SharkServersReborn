import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/users.entity";
import {RolesModule} from "../roles/roles.module";
import {AuthenticatorModule} from "../authenticator/authenticator.module";
import {MailModule} from "../mail/mail.module";
import { UsersController } from './controllers/users.controller';
import {UsersService} from "./services/users.service";
import {ProfileController} from "./controllers/profile.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MailModule,
        RolesModule,
        AuthenticatorModule,
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController, ProfileController]
})
export class UsersModule {}
