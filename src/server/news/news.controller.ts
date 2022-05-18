import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {Crud} from "@nestjsx/crud";
import {News} from "./news.entity";
import {NewsService} from "./news.service";

@ApiTags('news')
@Crud({
    model: {
        type: News
    },
    routes: {
        only: ["getOneBase", "getManyBase"]
    },
    params: {
        slug: {
            field: 'slug',
            type: "string",
            primary: true
        },
    }
})
@Controller('api/news')
export class NewsController {
    constructor(private service: NewsService) {}
}
