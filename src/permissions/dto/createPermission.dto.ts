import {IsString, Length} from "class-validator";

export class CreatePermissionDto {
    @Length(3, 30)
    @IsString()
    module: string;

    @Length(3, 30)
    @IsString()
    value: string;

}