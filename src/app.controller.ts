import {Controller, Get, Post, Req, Request, Res, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthenticatedGuard} from "./auth/guards/authenticated.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  async profile(@Req() req)  {
    return req.user;
  }
}
