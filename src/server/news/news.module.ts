import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "./news.entity";
import {UsersModule} from "../users/users.module";
import { NewsController } from './controllers/news.controller';

@Module({
  imports: [
      TypeOrmModule.forFeature([News]),

  ],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule {}
