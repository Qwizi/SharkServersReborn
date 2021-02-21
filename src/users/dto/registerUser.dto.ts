import {IsAlphanumeric, IsEmail, IsNotIn, IsOptional, IsString, Length, ValidateNested} from "class-validator";
import {Role} from "../../roles/roles.entity";

export class RegisterUserDto {
    @Length(6, 30)
    @IsAlphanumeric()
    username: string;

    @Length(8, 40)
    password: string;

    @IsEmail()
    email: string;
}