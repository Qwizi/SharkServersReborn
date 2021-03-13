import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import {RecruitmentApplication} from "../entity/recruitmentApplication.entity";
import {RecruitmentApplicationService} from "../services/recruitmentApplication.service";

@Crud({
    model: {
        type: RecruitmentApplication,
    },
    routes: {
        only: ["getOneBase", "getManyBase"]
    },
    params: {
        id: {
            field: 'id',
            type: "uuid",
            primary: true
        },
    },
    query: {
        alwaysPaginate: true,
        join: {
            position: {
                eager: true
            },
            'position.role': {
                eager: true
            },
            author: {
                eager: true
            },
            'author.steam_profile': {
                eager: true
            }
        }
    }
})
@Controller("api/recruitment/application")
export class RecruitmentApplicationController implements CrudController<RecruitmentApplication> {
    constructor(public service: RecruitmentApplicationService) {}
}