import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "./news.entity";
import { NewsController, NewsV2Controller } from './controllers/news.controller';
@Module({
  imports: [
      TypeOrmModule.forFeature([News]),
  ],
  providers: [NewsService],
  exports: [NewsService],
  controllers: [NewsController, NewsV2Controller]
})
export class NewsModule {}
