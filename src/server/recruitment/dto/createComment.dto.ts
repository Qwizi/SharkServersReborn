import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {
	@IsNotEmpty()
	@IsString()
	applicationId: string;

	@IsNotEmpty()
	@IsString()
	content: string;
}