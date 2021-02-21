import {IsOptional, IsString, Length, ValidateNested} from "class-validator";
import {Permission} from "../../permissions/permissions.entity";

export class CreateRoleDto {
    @Length(3, 32)
    @IsString()
    name: string;

    @Length(3, 20)
    @IsString()
    @IsOptional()
    color?: string;

    @ValidateNested()
    permissions: Permission[]
}