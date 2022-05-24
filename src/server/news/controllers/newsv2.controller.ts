import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {Crud, CrudController} from "@nestjsx/crud";
import {News} from "../news.entity";
import { NewsV2Service } from '../services/newsv2.service';

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
    constructor(public service: NewsV2Service) {}
}
