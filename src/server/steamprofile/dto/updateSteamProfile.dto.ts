import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateSteamProfileDto {
    @IsString()
    @IsOptional()
    nickname?: string;

    @IsString()
    @IsOptional()
    steamid64?: string;

    @IsString()
    @IsOptional()
    steamid32?: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsString()
    @IsOptional()
    avatar_medium?: string;

    @IsString()
    @IsOptional()
    avatar_full?: string;

    @IsString()
    @IsOptional()
    url?: string;
}