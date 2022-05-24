import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "./news.entity";
import {UsersModule} from "../users/users.module";
import { NewsController } from './controllers/news.controller';
import { NewsV2Controller } from './controllers/newsv2.controller';
import { NewsV2Service } from './services/newsv2.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([News]),

  ],
  providers: [NewsService, NewsV2Service],
  exports: [NewsV2Service],
  controllers: [NewsController, NewsV2Controller]
})
export class NewsModule {}
