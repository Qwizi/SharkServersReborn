import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { PermissionsModule } from './permissions/permissions.module';
import {Permission} from "./permissions/permissions.entity";
import {Perms} from "./permissions/permissions.enum";

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
            Permission
        ],
        synchronize: true,
      }),
      PermissionsModule.register({
          modules: [
              {
                  module: PermissionsModule.name,
                  permissions: [
                      Perms.CREATE,
                      Perms.FIND,
                      Perms.FIND_ONE,
                      Perms.UPDATE,
                      Perms.DELETE,
                  ]
              }
          ]
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
