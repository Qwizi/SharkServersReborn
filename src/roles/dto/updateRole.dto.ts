import {IsOptional, IsString, Length, ValidateNested} from "class-validator";
import {Permission} from "../../permissions/permissions.entity";

export class UpdateRoleDto {
    @Length(3, 32)
    @IsString()
    @IsOptional()
    name?: string;

    @Length(3, 20)
    @IsString()
    @IsOptional()
    color?: string;

    @ValidateNested()
    @IsOptional()
    permissions?: Permission[]
}