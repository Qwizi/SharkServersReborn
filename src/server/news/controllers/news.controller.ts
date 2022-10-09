import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {Crud, CrudController} from "@nestjsx/crud";
import {News} from "../news.entity";
import {NewsService} from "../services/news.service";

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
@Controller('news')
export class NewsController {
    constructor(private service: NewsService) {}
}

@ApiTags('news')
@Crud({
    model: {
        type: News
    },
    routes: {
        only: ["getOneBase", "getManyBase"]
    },
    query: {
		alwaysPaginate: true,
    },
    params: {
        slug: {
            field: 'slug',
            type: "string",
            primary: true
        },
    }
})
@Controller({
    version: '2',
    path: "news"
})
export class NewsV2Controller implements CrudController<News> {
    constructor(public service: NewsService) {}

    get base(): CrudController<News> {
        return this;
    }
}
