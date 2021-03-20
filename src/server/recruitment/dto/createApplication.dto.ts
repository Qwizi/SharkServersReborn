import {RecruitmentPosition} from "../entity/recruitmentPosition.entity";
import {IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";

export class CreateApplicationDto {
	@IsNotEmpty()
	@IsNumber()
	position: number

	@IsNotEmpty()
	@IsNumber()
	age: number;

	@IsNotEmpty()
	@IsString()
	experience: string;

	@IsNotEmpty()
	@IsString()
	description: string;
}