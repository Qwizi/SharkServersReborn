import {IsNotEmpty, IsString} from "class-validator";

export class CreateSteamProfileWithSteamID64OnlyDto {
    @IsString()
    @IsNotEmpty()
    steamid64: string;
}