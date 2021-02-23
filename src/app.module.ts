import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { PermissionsModule } from './permissions/permissions.module';
import {Permission} from "./permissions/permissions.entity";
import { RolesModule } from './roles/roles.module';
import {permissionsDefault} from "./permissions/permissions.uitils";
import {Role} from "./roles/roles.entity";
import { UsersModule } from './users/users.module';
import {User} from "./users/users.entity";
import { AuthenticatorModule } from './authenticator/authenticator.module';
import {Operation} from "./authenticator/operation.entity";
import {MailModule} from "./mail/mail.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        entities: [
            Permission,
            Role,
            User,
            Operation
        ],
        synchronize: true,
      }),
      RolesModule,
      MailModule,
      AuthenticatorModule,
      UsersModule,
      PermissionsModule.register({
          modules: [
              {
                  module: PermissionsModule.name,
                  permissions: permissionsDefault
              },
              {
                  module: RolesModule.name,
                  permissions: permissionsDefault
              },
              {
                  module: UsersModule.name,
                  permissions: permissionsDefault
              }
          ]
      }),
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
