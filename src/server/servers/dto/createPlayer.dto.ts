import {IsNotEmpty, ValidateNested, IsString} from "class-validator";
import { SteamProfile } from "src/server/steamprofile/steamProfile.entity";
import { Server } from "../entity/server.entity";

export class CreatePlayerDto {
	@IsNotEmpty()
	@ValidateNested()
	server: Server

	@IsNotEmpty()
	@ValidateNested()
	steam_profile: SteamProfile
}