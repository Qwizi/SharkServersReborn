import {IsNotEmpty, IsString} from "class-validator";

export class SteamCallbackDto {

    @IsNotEmpty()
    @IsString()
    assoc_handle: string;

    @IsNotEmpty()
    @IsString()
    claimed_id: string;

    @IsNotEmpty()
    @IsString()
    identity: string;

    @IsNotEmpty()
    @IsString()
    mode: string;

    @IsNotEmpty()
    @IsString()
    ns: string;

    @IsNotEmpty()
    @IsString()
    op_endpoint: string;

    @IsNotEmpty()
    @IsString()
    response_nonce: string;

    @IsNotEmpty()
    @IsString()
    return_to: string;

    @IsNotEmpty()
    @IsString()
    sig: string;

    @IsNotEmpty()
    @IsString()
    signed: string;

}