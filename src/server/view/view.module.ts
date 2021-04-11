import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import {WebClientGateway} from "./gateway/webClient.gateway";

@Module({
  providers: [ViewService, WebClientGateway],
  controllers: [ViewController]
})
export class ViewModule {}
