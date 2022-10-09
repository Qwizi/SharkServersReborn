import { IsArray, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsNumber()
  positionId: number;

  @IsNotEmpty()
  @IsArray()
  answers: object[];
}
