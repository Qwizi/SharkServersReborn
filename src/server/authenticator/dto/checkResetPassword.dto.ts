import {IsNotEmpty, IsString, Length} from "class-validator";

export class CheckResetPasswordDto {
    @IsString()
    @Length(32, 32)
    @IsNotEmpty()
    encrypted_code: string;
}