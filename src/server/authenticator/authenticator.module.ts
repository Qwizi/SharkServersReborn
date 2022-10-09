import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';
import { OperationsService } from './services/operations.service';
import { AuthenticatorService } from './services/authenticator.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      //port: process.env.REDIS_PORT
    }),
  ],
  providers: [OperationsService, AuthenticatorService],
  exports: [OperationsService, AuthenticatorService],
})
export class AuthenticatorModule {}
