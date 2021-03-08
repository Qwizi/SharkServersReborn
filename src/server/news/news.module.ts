import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "./news.entity";

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsService]
})
export class NewsModule {}
