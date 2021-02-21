import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/createUser.dto";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";

@Injectable()
export class UsersService implements OnModuleInit {
    private logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async onModuleInit() {
        this.logger.log('UsersService dziala');
        console.log(await this.find());
    }

    async create(createUserDto: CreateUserDto): Promise<User | undefined> {
        const user = await this.usersRepository.create(createUserDto)
        await this.usersRepository.save(user);
        return user;
    }

    async find(options?: FindManyOptions): Promise<User[] | []> {
        return this.usersRepository.find(options);
    }

}
