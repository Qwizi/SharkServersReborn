import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post, Query,
  Req,
  Res
} from '@nestjs/common';
import { AppService } from './app.service';
import {ActivateAccountCodeDto} from "./authenticator/dto/activeteAccountCode.dto";
import {ResendActivateAccountEmailDto} from "./authenticator/dto/resendActivateAccountEmail.dto";
import {ResetPasswordDto} from "./authenticator/dto/resetPassword.dto";
import {ResetPasswordPostDto} from "./authenticator/dto/resetPasswordPost.dto";

@Controller('api')
export class AppController {
  private logger = new Logger(AppController.name);
  constructor(
      private readonly appService: AppService
  ) {

  }

  @Get()
  getHello() {
    return {msg: this.appService.getHello()};
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

  @HttpCode(200)
  @Post('activate-account/resend')
  async resendActivateAccountEmailPost(
      @Body() resentActivateAccountEmailDto: ResendActivateAccountEmailDto,
      @Req() req
  ) {
    return this.appService.resendActivateAccountEmail(resentActivateAccountEmailDto, req)
  }

  @HttpCode(200)
  @Post('reset-password/send')
  async sendResetPasswordEmail(
      @Body() resetPasswordDto: ResetPasswordDto,
      @Req() req
  ) {
    return this.appService.sendResetPasswordEmail(resetPasswordDto, req);
  }

  @Get('reset-password')
  async resetPasswordGet(
      @Query('code') encryptedCode: string,
      @Res() res
  ) {
    try {
      if (!encryptedCode) return res.redirect('/');
      const isValidCode = await this.appService.checkCode(encryptedCode);
      if (!isValidCode) return res.redirect('/');
    } catch (e) {
      this.logger.error(e.message);
      return res.redirect('/')
    }
    return res.status(200).json({msg: 'tutaj bedzie formularz'})
  }

  @HttpCode(200)
  @Post('reset-password')
  async resetPasswordPost(
      @Body() resetPasswordPostDto: ResetPasswordPostDto
  ) {
    return this.appService.resetPassword(resetPasswordPostDto);
  }
}
