import {IsEnum, IsString, Length, ValidateNested} from "class-validator";
import {Operations} from "../operations.enums";
import {User} from "../../users/entity/users.entity";

export class CreateOperationDto {
    @Length(6, 6)
    @IsString()
    code: string;

    @IsEnum(Operations)
    type: Operations

    @ValidateNested()
    user: User
}