import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../news.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class NewsService extends TypeOrmCrudService<News> {
  constructor(@InjectRepository(News) public repo) {
    super(repo);
  }
}
