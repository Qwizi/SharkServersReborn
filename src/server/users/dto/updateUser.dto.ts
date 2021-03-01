import {IsAlphanumeric, IsBoolean, IsEmail, IsOptional, Length, ValidateNested} from "class-validator";
import {Role} from "../../roles/roles.entity";

export class UpdateUserDto {
    @Length(6, 30)
    @IsAlphanumeric()
    @IsOptional()
    username?: string;

    @Length(8, 40)
    @IsOptional()
    password?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ValidateNested()
    @IsOptional()
    roles?: Role[]
}