import {Body, Controller, Get, HttpCode, Post, Req, UseGuards} from '@nestjs/common';
import {AuthenticatedGuard} from "../auth/guards/authenticated.guard";
import {Perms} from "../auth/decorators/permissions.decorator";
import {ProfileService} from "./profile.service";
import {ChangePasswordDto} from "./dto/changePassword.dto";
import {ChangeUsernameDto} from "./dto/changeUsername.dto";

@UseGuards(AuthenticatedGuard)
@Perms('profile.show_profile')
@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) {}
    @Get()
    async profile(@Req() req) {
        return req.user;
    }

    @Perms('profile.change_password')
    @Get('password')
    async changePasswordGet() {
        return {msg: 'Tutaj bedzie formularz do zmiany hasla'}
    }

    @HttpCode(200)
    @Perms('profile.change_password')
    @Post('password')
    async changePasswordPost(
        @Body() changePasswordDto: ChangePasswordDto,
        @Req() req
    ) {
        return this.profileService.changePassword(req.user.id, changePasswordDto)
    }

    @Perms('profile.change_username')
    @Get('username')
    async changeUsernameGet() {
        return {msg: 'Tutaj bedzie formularz do zmiany username'}
    }

    @HttpCode(200)
    @Perms('profile.change_username')
    @Post('username')
    async changeUsernamePost(
        @Body() changeUsernameDto: ChangeUsernameDto,
        @Req() req
    ) {
        return this.profileService.changeUsername(req.user, changeUsernameDto)
    }
}
