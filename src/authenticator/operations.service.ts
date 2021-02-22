import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Operation} from "./operation.entity";
import {Repository} from "typeorm";
import {CreateOperationDto} from "./dto/createOperation.dto";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";

@Injectable()
export class OperationsService implements OnModuleInit {
    private logger = new Logger(OperationsService.name);
    constructor(@InjectRepository(Operation) private operationsService: Repository<Operation>) {}

    async onModuleInit() {
        this.logger.log('Operacje dzialaja')
        console.log(await this.find());
    }

    async create(createOperationDto: CreateOperationDto): Promise<Operation> {
        const operation = await this.operationsService.create(createOperationDto);
        await this.operationsService.save(operation);
        return operation;
    }

    async find(options?: FindManyOptions): Promise<Operation[]> {
        return this.operationsService.find(options);
    }
}