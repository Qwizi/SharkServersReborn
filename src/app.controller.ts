import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post, Query,
  Req,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthenticatedGuard} from "./auth/guards/authenticated.guard";
import {AuthenticatorService} from "./authenticator/authenticator.service";
import {UsersService} from "./users/users.service";
import {Operations} from "./authenticator/operations.enums";
import {ActivateAccountCodeDto} from "./authenticator/dto/activeteAccountCode.dto";
import {ResendActivateAccountEmailDto} from "./authenticator/dto/resendActivateAccountEmail.dto";

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);
  constructor(
      private readonly appService: AppService
  ) {

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('activate-account')
  async activateAccountGet(
      @Query('code') encryptedCode,
      @Res() res,
  ) {
    if (encryptedCode) {
      try {
        await this.appService.activateAccountEncryptedCode(encryptedCode);
      } catch (e) {
        this.logger.error(e.message);
        return res.redirect('/activate-account/')
      }
    }
    return res.status(200).json({msg: 'tutaj bedzie formularz'})
  }

  @HttpCode(200)
  @Post('activate-account')
  async activateAccountPost(
      @Body() activateAccountCodeDto: ActivateAccountCodeDto
  ) {
    return await this.appService.activateAccount(activateAccountCodeDto);
  }

  @Get('activate-account/resend')
  async resendActivateAccountEmailGet() {
    return {msg: 'tutaj bedzie formularz'}
  }

  @HttpCode(200)
  @Post('activate-account/resend')
  async resendActivateAccountEmailPost(
      @Body() resentActivateAccountEmailDto: ResendActivateAccountEmailDto,
      @Req() req
  ) {
    return this.appService.resendActivateAccountEmail(resentActivateAccountEmailDto, req)
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  async profile(@Req() req)  {
    return req.user;
  }
}
