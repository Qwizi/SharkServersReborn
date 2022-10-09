import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class DisconnectAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['steam'])
  account: string;
}
