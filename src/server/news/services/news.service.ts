import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "../news.entity";
import {Repository} from "typeorm";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";

@Injectable()
export class NewsService extends TypeOrmCrudService<News> implements OnModuleInit {
    constructor(
        @InjectRepository(News) private newsRepository: Repository<News>,
    ) {
        super(newsRepository);
    }

    async onModuleInit() {

    }

    /*async create(author: User, createNewsDto: CreateNewsDto): Promise<News> {
        const news = await this.newsRepository.create({
            ...createNewsDto,
            slug: slugify(createNewsDto.title, {lower: true}),
            author: author
        })
        await this.newsRepository.save(news);
        return news;
    }

    async find(options?: FindManyOptions): Promise<News[] | []> {
        return this.newsRepository.find(options);
    }

    async findOne(options?: FindOneOptions<News>): Promise<News | undefined> {
        return this.newsRepository.findOne(options);
    }

    async update(news: News, updateNewsDto: UpdateNewsDto): Promise<News> {
        news.title = updateNewsDto.title || news.title;
        news.content = updateNewsDto.content || news.content;
        news.author = updateNewsDto.author || news.author;
        await this.newsRepository.save(news);
        return news;
    }

    async remove(entity: News, options?: RemoveOptions): Promise<any> {
        return options ? this.newsRepository.remove(entity, options) : this.newsRepository.remove(entity);
    }*/
}
