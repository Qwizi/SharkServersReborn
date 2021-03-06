import {IsNotEmpty, IsString} from "class-validator";

export class CreateSteamProfileDto {
    @IsString()
    @IsNotEmpty()
    nickname: string;

    @IsString()
    @IsNotEmpty()
    steamid64: string;

    @IsString()
    @IsNotEmpty()
    steamid32: string;

    @IsString()
    @IsNotEmpty()
    avatar: string;

    @IsString()
    @IsNotEmpty()
    avatar_medium: string;

    @IsString()
    @IsNotEmpty()
    avatar_full: string;

    @IsString()
    @IsNotEmpty()
    url: string;
}