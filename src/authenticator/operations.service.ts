import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Operation} from "./operation.entity";
import {Repository} from "typeorm";
import {CreateOperationDto} from "./dto/createOperation.dto";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {RemoveOptions} from "typeorm/browser";

@Injectable()
export class OperationsService implements OnModuleInit {
    private logger = new Logger(OperationsService.name);
    constructor(@InjectRepository(Operation) private operationsService: Repository<Operation>) {}

    async onModuleInit() {
        this.logger.log('Operacje dzialaja')
        const op = await this.findOne();
        await this.remove(op);
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

    async findOne(options?: FindOneOptions<Operation>): Promise<Operation | undefined> {
        return this.operationsService.findOne(options);
    }

    async remove(entity: Operation, options?: RemoveOptions): Promise<any> {
        return options ? this.operationsService.remove(entity, options) : this.operationsService.remove(entity);
    }
}