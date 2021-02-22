import {Injectable, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Operation} from "./operation.entity";
import {Repository} from "typeorm";

@Injectable()
export class OperationsService implements OnModuleInit {
    constructor(@InjectRepository(Operation) private operation: Repository<Operation>) {}

    async onModuleInit() {}


}