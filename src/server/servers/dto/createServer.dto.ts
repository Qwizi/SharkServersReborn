import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  ip: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;
}
