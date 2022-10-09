import {
  BadRequestException,
  Controller,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Question } from '../../entity/question.entity';
import { QuestionService } from '../../services/question.service';

@ApiTags('admin')
@Crud({
  model: {
    type: Question,
  },
  query: {
    alwaysPaginate: true,
  },
})
@Controller('admin/recruitment/questions')
export class QuestionAdminController implements CrudController<Question> {
  constructor(public service: QuestionService) {}
}
