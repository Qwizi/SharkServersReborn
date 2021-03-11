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
import {BullModule} from "@nestjs/bull";
import { ProfileModule } from './profile/profile.module';
import {Perms} from "./permissions/permissions.enum";
import { ViewModule } from './view/view.module';
import { SteamProfileModule } from './steamprofile/steamProfile.module';
import {SteamProfile} from "./steamprofile/steamProfile.entity";
import { NewsModule } from './news/news.module';
import {News} from "./news/news.entity";
import { RecruitmentModule } from './recruitment/recruitment.module';
import {RecruitmentApplication} from "./recruitment/entity/recruitmentApplication.entity";
import {RecruitmentPosition} from "./recruitment/entity/recruitmentPosition.entity";

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
            Operation,
            SteamProfile,
            News,
            RecruitmentApplication,
            RecruitmentPosition
        ],
        synchronize: true,
      }),
      BullModule.forRoot({
          redis: {
              host: process.env.REDIS_HOST,
              port: parseInt(process.env.REDIS_PORT),
          },
      }),
      RolesModule,
      MailModule,
      AuthenticatorModule,
      UsersModule,
      AuthModule,
      ProfileModule,
      SteamProfileModule,
      NewsModule,
      RecruitmentModule,
      ViewModule,
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
              },
              {
                  module: NewsModule.name,
                  permissions: permissionsDefault
              },
              {
                  module: ProfileModule.name,
                  permissions: [
                      Perms.SHOW_PROFILE,
                      Perms.CHANGE_EMAIL,
                      Perms.CHANGE_PASSWORD,
                      Perms.CHANGE_USERNAME
                  ]
              },
              {
                  module: RecruitmentModule.name,
                  permissions: permissionsDefault
              },
          ]
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
