import {HttpStatus, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {AuthenticatorService} from "./authenticator/authenticator.service";
import {UsersService} from "./users/users.service";
import {Operations} from "./authenticator/operations.enums";
import {ActivateAccountCodeDto} from "./authenticator/dto/activeteAccountCode.dto";

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(
      private readonly authenticatorService: AuthenticatorService,
      private readonly usersService: UsersService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async activateAccount(activateAccountCodeDto: ActivateAccountCodeDto) {
    this.logger.log(`Rozpoczynam aktywacje konta o kodzie ${activateAccountCodeDto.code}`)
    const [isValidCode, operation] = await this.authenticatorService.checkCode(activateAccountCodeDto.code);
    if (!isValidCode || !operation || operation.type !== Operations.CONFIRM_EMAIL) throw new NotFoundException();
    const user = operation.user;
    await this.usersService.activate(user);
    this.logger.log(`Konto ${user.username} zostalo aktywowane`);
  }

  async activateAccountEncryptedCode(encryptedCode: string) {
    this.logger.log(`Rozpoczynam aktywacje konta o zaszyfrowanym kodzie ${encryptedCode}`)
    const decryptedCode = await this.authenticatorService.decryptCode(encryptedCode);
    this.logger.log(`Rozszyforowny kod ${decryptedCode}`)
    await this.activateAccount({code: decryptedCode});
  }
}
