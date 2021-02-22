import {CacheModule, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Operation} from "./operation.entity";
import {OperationsService} from "./operations.service";
import * as redisStore from 'cache-manager-redis-store';
@Module({
    imports: [
        TypeOrmModule.forFeature([Operation]),
        CacheModule.register({
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        })
    ],
    providers: [OperationsService],
    exports: [OperationsService]
})
export class AuthenticatorModule {}
