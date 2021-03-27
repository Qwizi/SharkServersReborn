import {IsArray, IsNotEmpty, IsNumber} from "class-validator";

export class CreatePositionDto {
	@IsNotEmpty()
	@IsNumber()
	roleId: number;

	@IsNotEmpty()
	@IsArray()
	questions: number[]

	@IsNumber()
	free_space: number;
}