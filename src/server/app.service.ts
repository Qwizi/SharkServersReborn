import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatorService } from './authenticator/services/authenticator.service';
import { UsersService } from './users/services/users.service';
import { Operations } from './authenticator/operations.enums';
import { ActivateAccountCodeDto } from './authenticator/dto/activeteAccountCode.dto';
import { ResendActivateAccountEmailDto } from './authenticator/dto/resendActivateAccountEmail.dto';
import { MailService } from './mail/mail.service';
import { AuthService } from './auth/services/auth.service';
import { Request } from 'express';
import { ResetPasswordDto } from './authenticator/dto/resetPassword.dto';
import { ResetPasswordPostDto } from './authenticator/dto/resetPasswordPost.dto';
import { CheckResetPasswordDto } from './authenticator/dto/checkResetPassword.dto';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(
    private readonly authenticatorService: AuthenticatorService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async activateAccount(activateAccountCodeDto: ActivateAccountCodeDto) {
    this.logger.log(
      `Rozpoczynam aktywacje konta o kodzie ${activateAccountCodeDto.code}`,
    );
    const [isValidCode, operation] = await this.authenticatorService.checkCode(
      activateAccountCodeDto.code,
      true,
      Operations.CONFIRM_EMAIL,
    );
    if (!isValidCode || !operation)
      throw new BadRequestException('Code invalid or expired');
    const user = operation.user;
    if (user.is_active)
      throw new BadRequestException('This users is already activated');
    await this.usersService.activate(user);
    this.logger.log(`Konto ${user.username} zostalo aktywowane`);
  }

  async activateAccountEncryptedCode(encryptedCode: string) {
    try {
      this.logger.log(
        `Rozpoczynam aktywacje konta o zaszyfrowanym kodzie ${encryptedCode}`,
      );
      const decryptedCode = await this.authenticatorService.decryptCode(
        encryptedCode,
      );
      this.logger.log(`Rozszyforowny kod ${decryptedCode}`);
      await this.activateAccount({ code: decryptedCode });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Code expire or invalid');
    }
  }

  async resendActivateAccountEmail(
    resendActivateAccountEmail: ResendActivateAccountEmailDto,
    req: Request,
  ) {
    const user = await this.usersService.findOne({
      where: {
        email: resendActivateAccountEmail.email,
        is_active: false,
      },
      relations: ['operations'],
    });
    if (!user) throw new NotFoundException();
    await this.authenticatorService.deactivateConfirmCodes(user);
    const [code, encryptedCode] = await this.authenticatorService.createCode(
      user,
    );
    const url = await this.mailService.getAccountActivateUrl(
      req,
      encryptedCode,
    );
    console.log(url);
    const job = await this.mailService.sendActivateAccountEmail(
      user,
      code,
      url,
    );
  }

  async sendResetPasswordEmail(
    resetPasswordDto: ResetPasswordDto,
    req: Request,
  ) {
    const user = await this.usersService.findOne({
      where: { email: resetPasswordDto.email },
      relations: ['operations'],
    });
    if (!user) throw new NotFoundException();
    await this.authenticatorService.deactivateConfirmCodes(
      user,
      Operations.CONFIRM_RESET_PASSWORD,
    );
    const [code, encryptedCode] = await this.authenticatorService.createCode(
      user,
      Operations.CONFIRM_RESET_PASSWORD,
    );
    const url = await this.mailService.getResetPasswordUrl(req, encryptedCode);
    const job = await this.mailService.sendResetPasswordEmail(user, code, url);
  }

  async checkCode(
    checkResetPasswordDto: CheckResetPasswordDto,
  ): Promise<object> {
    try {
      const decryptedCode = await this.authenticatorService.decryptCode(
        checkResetPasswordDto.encrypted_code,
      );
      const [isValidCode, operation] =
        await this.authenticatorService.checkCode(
          decryptedCode,
          false,
          Operations.CONFIRM_RESET_PASSWORD,
        );
      return { status: isValidCode };
    } catch (e) {
      this.logger.error(e.message);
      return { status: false };
    }
  }

  async resetPassword(resetPasswordPostDto: ResetPasswordPostDto) {
    try {
      const { encrypted_code, new_password } = resetPasswordPostDto;

      const decryptedCode = await this.authenticatorService.decryptCode(
        encrypted_code,
      );
      const [isValidCode, operation] =
        await this.authenticatorService.checkCode(
          decryptedCode,
          true,
          Operations.CONFIRM_RESET_PASSWORD,
        );
      if (isValidCode) {
        const { user } = operation;
        const hashedPassword = await this.usersService.createHashedPassword(
          new_password,
        );
        await this.usersService.update(user, { password: hashedPassword });
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
