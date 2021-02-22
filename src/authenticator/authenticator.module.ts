import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Operation} from "./operation.entity";
import {OperationsService} from "./operations.service";

@Module({
    imports: [TypeOrmModule.forFeature([Operation])],
    providers: [OperationsService],
    exports: [OperationsService]
})
export class AuthenticatorModule {}
