import {CacheModule, Module} from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import {WebClientGateway} from "./gateway/webClient.gateway";
import * as redisStore from 'cache-manager-redis-store';
import {SteamProfileModule} from "../steamprofile/steamProfile.module";

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      //port: process.env.REDIS_PORT
    }),
      SteamProfileModule
  ],
  providers: [ViewService, WebClientGateway],
  controllers: [ViewController]
})
export class ViewModule {}
