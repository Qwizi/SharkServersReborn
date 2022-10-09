import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordPostDto {
  @IsString()
  @Length(32, 32)
  @IsNotEmpty()
  encrypted_code: string;

  @IsString()
  @Length(8, 40)
  @IsNotEmpty()
  new_password: string;
}
