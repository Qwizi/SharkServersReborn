import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Operation} from "./operation.entity";
import {Repository} from "typeorm";
import {CreateOperationDto} from "./dto/createOperation.dto";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {RemoveOptions} from "typeorm/browser";
import {UpdateOperationDto} from "./dto/updateOperation.dto";

@Injectable()
export class OperationsService implements OnModuleInit {
    private logger = new Logger(OperationsService.name);
    constructor(@InjectRepository(Operation) private operationsService: Repository<Operation>) {}

    async onModuleInit() {
        this.logger.log('Operacje dzialaja')
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

    async update(operation: Operation, updateOperationDto: UpdateOperationDto): Promise<Operation> {
        operation.code = updateOperationDto.code || operation.code;
        operation.type = updateOperationDto.type || operation.type;
        operation.user = updateOperationDto.user || operation.user;
        operation.is_active = updateOperationDto.is_active || operation.is_active;
        await this.operationsService.save(operation);
        return operation;
    }

    async remove(entity: Operation, options?: RemoveOptions): Promise<any> {
        return options ? this.operationsService.remove(entity, options) : this.operationsService.remove(entity);
    }

    async deactivate(operation: Operation) {
        return this.update(operation, {is_active: false})
    }
}