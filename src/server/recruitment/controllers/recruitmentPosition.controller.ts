import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import {RecruitmentPosition} from "../entity/recruitmentPosition.entity";
import {RecruitmentPositionService} from "../services/recruitmentPosition.service";

@Crud({
    model: {
        type: RecruitmentPosition,
    },
    routes: {
        only: ["getOneBase", "getManyBase", "createOneBase"]
    },
    query: {
        alwaysPaginate: true,
        join: {
            role: {
                eager: true
            },
            applications: {
                eager: true
            }
        }
    }
})
@Controller("api/recruitment/position")
export class RecruitmentPositionController implements CrudController<RecruitmentPosition> {
    constructor(public service: RecruitmentPositionService) {}
}