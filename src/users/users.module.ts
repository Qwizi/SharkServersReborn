import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";
import { UsersService } from './users.service';
import {RolesModule} from "../roles/roles.module";
import {AuthenticatorModule} from "../authenticator/authenticator.module";
import {MailModule} from "../mail/mail.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MailModule,
        RolesModule,
        AuthenticatorModule,
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
