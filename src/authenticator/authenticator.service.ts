import {CACHE_MANAGER, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {Cache} from 'cache-manager';
import {OperationsService} from "./operations.service";

@Injectable()
export class AuthenticatorService implements OnModuleInit {
    private logger = new Logger(AuthenticatorService.name);
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private operationsService: OperationsService
    ) {}

    async onModuleInit() {
        this.logger.log(await this.generateCode());
    }

    async generateCode(length: number = 6) {
        return Math.random().toString(20).substr(2, length).toUpperCase()
    }
}
