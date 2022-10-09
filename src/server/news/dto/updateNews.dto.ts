import { IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { User } from '../../users/entity/users.entity';

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  @Length(6, 80)
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @ValidateNested()
  @IsOptional()
  author?: User;
}
