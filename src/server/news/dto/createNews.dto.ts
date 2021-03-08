import {IsNotEmpty, IsString, Length} from "class-validator";

export class CreateNewsDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 80)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}