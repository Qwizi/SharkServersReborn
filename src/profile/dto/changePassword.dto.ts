import {IsNotEmpty, IsString, Length, ValidateNested} from "class-validator";

export class ChangePasswordDto {
    @Length(8, 40)
    @IsString()
    @IsNotEmpty()
    old_password: string;

    @Length(8, 40)
    @IsString()
    @IsNotEmpty()
    new_password: string;

    @Length(8, 40)
    @IsString()
    @IsNotEmpty()
    new_password_confirm: string;
}