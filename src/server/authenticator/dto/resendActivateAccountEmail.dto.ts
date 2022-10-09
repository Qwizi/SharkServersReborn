import { IsEmail } from 'class-validator';

export class ResendActivateAccountEmailDto {
  @IsEmail()
  email: string;
}
