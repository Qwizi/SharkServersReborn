import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "./news.entity";
import {Repository} from "typeorm";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {CreateNewsDto} from "./dto/createNews.dto";
import slugify from "slugify";
import {User} from "../users/users.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class NewsService implements OnModuleInit {
    constructor(
        @InjectRepository(News) private newsRepository: Repository<News>,
        private usersService: UsersService
    ) {}

    async onModuleInit() {
        const user = await this.usersService.findOne();
        console.log(user);
        const news = await this.create(user, {title: "Tesowa wiaadomosc", content: "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMake"})
        console.log(await this.find());
        console.log(await this.findOne());
    }

    async create(author: User, createNewsDto: CreateNewsDto): Promise<News> {
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
}
