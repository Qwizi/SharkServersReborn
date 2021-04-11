import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreatePlayerDto {
	@IsNotEmpty()
	@IsNumber()
	server_id: number;

	@IsString()
	@IsNotEmpty()
	steamid64: string;
}