import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Operation} from "./operation.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Operation])]
})
export class AuthenticatorModule {}
