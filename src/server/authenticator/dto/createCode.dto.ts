import {Operations} from "../operations.enums";
import {IsEnum, IsNotEmpty, ValidateNested} from "class-validator";
import {User} from "../../users/users.entity";

export class CreateCodeDto {
    @IsEnum(Operations)
    @IsNotEmpty()
    type: Operations

    @ValidateNested()
    @IsNotEmpty()
    user: User
}