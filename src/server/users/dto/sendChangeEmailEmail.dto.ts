import {IsEmail, IsNotEmpty} from "class-validator";

export class SendChangeEmailEmailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}