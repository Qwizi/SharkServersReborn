import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangeEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(32, 32)
  @IsNotEmpty()
  encrypted_code: string;
}
