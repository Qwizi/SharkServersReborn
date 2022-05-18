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
import {CheckResetPasswordDto} from "./authenticator/dto/checkResetPassword.dto";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api')
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
    return this.appService.activateAccount(activateAccountCodeDto);
  }

  @HttpCode(200)
  @Post('activate-account/encrypted')
  async activateAccountEncryptedCodePost(
      @Body() activateAccountCodeDto
  ) {
      return await this.appService.activateAccountEncryptedCode(activateAccountCodeDto.code);
  }

  @HttpCode(200)
  @Post('activate-account/resend')
  async resendActivateAccountEmailPost(
      @Body() resentActivateAccountEmailDto: ResendActivateAccountEmailDto,
      @Req() req
  ) {
    return this.appService.resendActivateAccountEmail(resentActivateAccountEmailDto, req);
  }

  @HttpCode(200)
  @Post('reset-password/send')
  async sendResetPasswordEmail(
      @Body() resetPasswordDto: ResetPasswordDto,
      @Req() req
  ) {
    return this.appService.sendResetPasswordEmail(resetPasswordDto, req);
  }

  @Post('reset-password/check')
  async resetPasswordGet(
      @Body() checkResetPassword: CheckResetPasswordDto
  ) {
    return this.appService.checkCode(checkResetPassword);
  }

  @HttpCode(200)
  @Post('reset-password')
  async resetPasswordPost(
      @Body() resetPasswordPostDto: ResetPasswordPostDto
  ) {
    return this.appService.resetPassword(resetPasswordPostDto);
  }
}
