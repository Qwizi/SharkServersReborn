import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "../news.entity";
import {Repository} from "typeorm";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";

@Injectable()
export class NewsV2Service extends TypeOrmCrudService<News> {
    constructor(
        @InjectRepository(News) repo: Repository<News>,
    ) {
        super(repo);
    }

}
