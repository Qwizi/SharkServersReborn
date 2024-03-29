import {IsBoolean, IsEnum, IsOptional, IsString, Length, ValidateNested} from "class-validator";
import {Operations} from "../operations.enums";
import {User} from "../../users/entity/users.entity";

export class UpdateOperationDto {
    @Length(6, 6)
    @IsString()
    @IsOptional()
    code?: string;

    @IsEnum(Operations)
    @IsOptional()
    type?: Operations

    @ValidateNested()
    @IsOptional()
    user?: User

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}