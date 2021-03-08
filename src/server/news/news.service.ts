import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "./news.entity";
import {Repository} from "typeorm";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

@Injectable()
export class NewsService implements OnModuleInit {
    constructor(@InjectRepository(News) private newsService: Repository<News>) {}

    async onModuleInit() {
        console.log(await this.find());
        console.log(await this.findOne());
    }

    async find(options?: FindManyOptions): Promise<News[] | []> {
        return this.newsService.find(options);
    }

    async findOne(options?: FindOneOptions<News>): Promise<News | undefined> {
        return this.newsService.findOne(options);
    }
}
