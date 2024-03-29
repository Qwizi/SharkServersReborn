import {BadRequestException, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entity/users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/createUser.dto";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {RemoveOptions} from "typeorm/browser";
import {UpdateUserDto} from "./dto/updateUser.dto";
import * as bcrypt from 'bcrypt';
import {RegisterUserDto} from "./dto/registerUser.dto";
import {RolesService} from "../roles/services/roles.service";
import {AuthenticatorService} from "../authenticator/services/authenticator.service";
import {Operations} from "../authenticator/operations.enums";
import {MailService} from "../mail/mail.service";

@Injectable()
export class UsersService implements OnModuleInit {
    private logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private rolesService: RolesService,
        private authenticatorService: AuthenticatorService,
        private mailService: MailService
    ) {
    }

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

    async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
        user.username = updateUserDto.username || user.username;
        user.display_name = updateUserDto.display_name || user.display_name;
        user.avatar = updateUserDto.avatar || user.avatar;
        user.password = updateUserDto.password || user.password;
        user.email = updateUserDto.email || user.email;
        user.roles = updateUserDto.roles || user.roles;
        user.steam_profile = updateUserDto.steam_profile !== undefined ? updateUserDto.steam_profile : user.steam_profile;
        user.is_active = updateUserDto.is_active !== undefined ? updateUserDto.is_active : user.is_active;
        await this.usersRepository.save(user);
        return user;
    }

    async remove(entity: User, options?: RemoveOptions): Promise<any> {
        return options ? this.usersRepository.remove(entity, options) : this.usersRepository.remove(entity);
    }

    async activate(user: User): Promise<User> {
        return this.update(user, {is_active: true});
    }

    async deactivate(user: User): Promise<User> {
        return this.update(user, {is_active: false});
    }

    async createHashedPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const {username, password, email} = registerUserDto;
        const userExist = await this.findOne({
            where: [
                {username: registerUserDto.username},
                {email: registerUserDto.email}
            ]
        })
        if (userExist) throw new BadRequestException('User exists');

        const passwordHashed = await this.createHashedPassword(password);
        const userRole = await this.rolesService.findOne({where: {name: 'Uzytkowni'}});
        return this.create({
            username: username,
            display_name: username,
            password: passwordHashed,
            email: email,
            roles: [userRole]
        })
    }

    async comparePassword(password: string, hashedPassword: string, ) {
        return !!bcrypt.compare(password, hashedPassword);
    }
}
