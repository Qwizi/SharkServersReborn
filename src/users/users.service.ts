import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/createUser.dto";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {Role} from "../roles/roles.entity";
import {RemoveOptions} from "typeorm/browser";

@Injectable()
export class UsersService implements OnModuleInit {
    private logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async onModuleInit() {
        this.logger.log('UsersService dziala');
    }

    async create(createUserDto: CreateUserDto): Promise<User | undefined> {
        const user = await this.usersRepository.create(createUserDto)
        await this.usersRepository.save(user);
        return user;
    }

    async find(options?: FindManyOptions): Promise<User[] | []> {
        return this.usersRepository.find(options);
    }

    async findOne(options?: FindOneOptions<User>): Promise<User | undefined> {
        return this.usersRepository.findOne(options);
    }

    async remove(entity: User, options?: RemoveOptions): Promise<any> {
        return options ? this.usersRepository.remove(entity, options) : this.usersRepository.remove(entity);
    }
}
