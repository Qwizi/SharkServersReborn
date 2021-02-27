import {BadRequestException, HttpStatus, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {AuthenticatorService} from "./authenticator/authenticator.service";
import {UsersService} from "./users/users.service";
import {Operations} from "./authenticator/operations.enums";
import {ActivateAccountCodeDto} from "./authenticator/dto/activeteAccountCode.dto";
import {ResendActivateAccountEmailDto} from "./authenticator/dto/resendActivateAccountEmail.dto";
import {MailService} from "./mail/mail.service";
import {AuthService} from "./auth/auth.service";
import {Request} from "express";

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(
      private readonly authenticatorService: AuthenticatorService,
      private readonly usersService: UsersService,
      private readonly mailService: MailService,
      private readonly authService: AuthService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async activateAccount(activateAccountCodeDto: ActivateAccountCodeDto) {
    this.logger.log(`Rozpoczynam aktywacje konta o kodzie ${activateAccountCodeDto.code}`)
    const [isValidCode, operation] = await this.authenticatorService.checkCode(activateAccountCodeDto.code);
    if (!isValidCode || !operation || operation.type !== Operations.CONFIRM_EMAIL) throw new NotFoundException();
    const user = operation.user;
    if (user.is_active) throw new BadRequestException('This users is already activated')
    await this.usersService.activate(user);
    this.logger.log(`Konto ${user.username} zostalo aktywowane`);
  }

  async activateAccountEncryptedCode(encryptedCode: string) {
    this.logger.log(`Rozpoczynam aktywacje konta o zaszyfrowanym kodzie ${encryptedCode}`)
    const decryptedCode = await this.authenticatorService.decryptCode(encryptedCode);
    this.logger.log(`Rozszyforowny kod ${decryptedCode}`)
    await this.activateAccount({code: decryptedCode});
  }

  async resendActivateAccountEmail(resendActivateAccountEmail: ResendActivateAccountEmailDto, req: Request) {
      const user = await this.usersService.findOne({where: {email: resendActivateAccountEmail.email}, relations: ['operations']})
      console.log(user);
      if (!user) throw new NotFoundException()
      await this.authenticatorService.deactivateEmailConfirmCodes(user);
      const [code, encryptedCode] = await this.authService.createActivateCode(user);
      const url = await this.mailService.getAccountActivateUrl(req, encryptedCode);
      const job = await this.mailService.sendActivateAccountEmail(user, code, url);
  }
}
