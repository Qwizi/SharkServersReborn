import {IsOptional, IsString, Length} from "class-validator";

export class UpdatePermissionDto {
    @Length(3, 30)
    @IsString()
    @IsOptional()
    module?: string;

    @Length(3, 30)
    @IsString()
    @IsOptional()
    value?: string;
}