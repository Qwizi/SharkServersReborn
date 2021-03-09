import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "./news.entity";
import {UsersModule} from "../users/users.module";
import { NewsController } from './news.controller';

@Module({
  imports: [
      TypeOrmModule.forFeature([News]),
      UsersModule
  ],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule {}
