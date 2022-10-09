import { IsAlphanumeric, Length } from 'class-validator';

export class ChangeUsernameDto {
  @Length(5, 30)
  @IsAlphanumeric()
  username: string;
}
