import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/createUser.dto";

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

}
