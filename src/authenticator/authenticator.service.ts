import {CACHE_MANAGER, Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {OperationsService} from "./operations.service";
import {CreateCodeDto} from "./dto/createCode.dto";
import {Operations} from "./operations.enums";
import {Operation} from "./operation.entity";

@Injectable()
export class AuthenticatorService implements OnModuleInit {
    private logger = new Logger(AuthenticatorService.name);
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private operationsService: OperationsService
    ) {}

    async onModuleInit() {
       this.logger.log('Authenticator dziiala')
    }

    async generateCode(length: number = 6): Promise<any> {
        return Math.random().toString(20).substr(2, length).toUpperCase()
    }

    async createCode(createCodeDto: CreateCodeDto): Promise<any> {
        const code = await this.generateCode();
        const operation = await this.operationsService.create({
            code: code,
            type: createCodeDto.type,
            user: createCodeDto.user,
        })
        await this.cacheManager.set(`code:${code}`, operation, {ttl: 3600});
        return [code, operation];
    }

    async checkCode(code: string): Promise<[boolean, object | undefined]> {
        const key = `code:${code}`
        const operation = await this.cacheManager.get<Operation>(key)
        if (operation) {
            await this.cacheManager.del(key);
            return [true, operation];
        }
        return [false, undefined];
    }
}
