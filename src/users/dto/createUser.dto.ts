import {IsAlphanumeric, IsEmail, IsOptional, IsString, Length, ValidateNested} from "class-validator";
import {Role} from "../../roles/roles.entity";

export class CreateUserDto {
    @Length(6, 30)
    @IsAlphanumeric()
    username: string;

    @Length(8, 40)
    password: string;

    @IsEmail()
    email: string;

    @ValidateNested()
    @IsOptional()
    roles?: Role[]
}