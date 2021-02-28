import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/users.entity";
import {ChangePasswordDto} from "./dto/changePassword.dto";
import {ChangeUsernameDto} from "./dto/changeUsername.dto";

@Injectable()
export class ProfileService {
    constructor(private readonly usersService: UsersService) {}

    async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
        const user = await this.usersService.findOne({where: {id: userId}})
        const {old_password, new_password, new_password_confirm} = changePasswordDto;
        const expression = !await this.usersService.comparePassword(old_password, user.password) && new_password !== new_password_confirm;
        if (expression) throw new BadRequestException();
        const newPasswordHashed = await this.usersService.createHashedPassword(new_password);
        await this.usersService.update(user, {password: newPasswordHashed})
    }

    async changeUsername(user: User, changeUsernameDto: ChangeUsernameDto) {
        const {username} = changeUsernameDto;
        const usernameExists = await this.usersService.findOne({where: {username: username}})
        if (usernameExists) throw new BadRequestException('This username is already taken')
        await this.usersService.update(user, {username: username})
    }
}
