import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PermissionsModule } from './permissions/permissions.module';
import { Permission } from './permissions/permissions.entity';
import { RolesModule } from './roles/roles.module';
import { permissionsDefault } from './permissions/permissions.uitils';
import { Role } from './roles/roles.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/users.entity';
import { AuthenticatorModule } from './authenticator/authenticator.module';
import { Operation } from './authenticator/operation.entity';
//import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { Perms } from './permissions/permissions.enum';
import { SteamProfileModule } from './steamprofile/steamProfile.module';
import { SteamProfile } from './steamprofile/steamProfile.entity';
import { NewsModule } from './news/news.module';
import { News } from './news/news.entity';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { Position } from './recruitment/entity/position.entity';
import { Comment } from './recruitment/entity/comment.entity';
import { Question } from './recruitment/entity/question.entity';
import { PositionQuestionAnswer } from './recruitment/entity/positionQuestionAnswer.entity';
import { Application } from './recruitment/entity/application.entity';
import { Server } from './servers/entity/server.entity';
import { Player } from './servers/entity/player.entity';
import { PlayerStats } from './servers/entity/playerStats.entity';
import { ServersModule } from './servers/servers.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
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
        Position,
        Application,
        Comment,
        Question,
        PositionQuestionAnswer,
        Server,
        Player,
        PlayerStats,
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
    //MailModule,
    AuthenticatorModule,
    UsersModule,
    AuthModule,
    SteamProfileModule,
    NewsModule,
    RecruitmentModule,
    ServersModule,
    PermissionsModule.register({
      modules: [
        {
          module: PermissionsModule.name,
          permissions: permissionsDefault,
        },
        {
          module: RolesModule.name,
          permissions: permissionsDefault,
        },
        {
          module: UsersModule.name,
          permissions: [
            ...permissionsDefault,
            Perms.SHOW_PROFILE,
            Perms.CHANGE_EMAIL,
            Perms.CHANGE_PASSWORD,
            Perms.CHANGE_USERNAME,
          ],
        },
        {
          module: NewsModule.name,
          permissions: permissionsDefault,
        },
        {
          module: RecruitmentModule.name,
          permissions: [
            Perms.CREATE_APPLICATION,
            Perms.CREATE_POSITION,
            Perms.CREATE_COMMENT,
            Perms.ACCEPT_APPLICATION,
            Perms.OPEN_APPLICATION,
            Perms.REJECT_APPLICATION,
          ],
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
