import {CACHE_MANAGER, Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {OperationsService} from "./operations.service";
import {CreateCodeDto} from "./dto/createCode.dto";
import {Operation} from "./operation.entity";
import * as crypto from 'crypto';
import {User} from "../users/users.entity";
import {Operations} from "./operations.enums";

@Injectable()
export class AuthenticatorService implements OnModuleInit {
    private logger = new Logger(AuthenticatorService.name);
    private readonly algorithm: string;
    private readonly key;
    private readonly iv;

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private operationsService: OperationsService
    ) {
        this.algorithm = 'aes-256-cbc';
        this.key = crypto.randomBytes(32);
        this.iv = crypto.randomBytes(16);
    }

    async onModuleInit() {
        this.logger.log('Authenticator dziiala')
    }

    async generateCode(length: number = 6): Promise<any> {
        return Math.random().toString(20).substr(2, length).toUpperCase()
    }

    async encryptCode(code: string) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.key), this.iv);
        let encrypted = cipher.update(code);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }

    async decryptCode(code: string) {
        // @ts-ignore
        let iv = Buffer.from(this.iv, 'hex');
        // @ts-ignore
        let encryptedText = Buffer.from(code, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
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

    async checkCode(code: string): Promise<[boolean, Operation | undefined]> {
        const key = `code:${code}`
        const operation: Operation = await this.cacheManager.get<Operation>(key)
        if (operation && operation.is_active) {
            await this.cacheManager.del(key);
            await this.operationsService.deactivate(operation);
            return [true, operation];
        }
        return [false, undefined];
    }

    async deactivateCodes(username: string, operations: Operation[]) {
        /*this.logger.log(`Rozpoczynam deaktywacje wszystkich kodów ${user.username}`)
        const operations = await this.operationsService.find({where: {user: user, is_active: true}})
        for await (const op of operations) {
            await this.operationsService.deactivate(op);
            const key = `code:${op.code}`
            await this.cacheManager.del(key)
            this.logger.log(`Kod ${op.code} został deaktywowany`)
        }
        this.logger.log('Zakonczylem deaktywacje kodow');*/
        this.logger.log(`Rozpoczynam deaktywacje wszystkich kodów użytkownika ${username}`)
        for await (const op of operations) {
            await this.operationsService.deactivate(op);
            const key = `code:${op.code}`
            await this.cacheManager.del(key)
            this.logger.log(`Kod ${op.code} został deaktywowany`)
        }
        this.logger.log('Zakonczylem deaktywacje kodow');
    }

    async deactivateEmailConfirmCodes(user: User) {
        const {operations} = user;
        const filteredOperations = operations.filter(op => (op.is_active !== false))
        console.log(filteredOperations)
        await this.deactivateCodes(user.username, filteredOperations);
    }

}
