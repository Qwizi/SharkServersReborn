import {Body, Controller, Get, HttpCode, Logger, Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import {AuthenticatedGuard} from "../auth/guards/authenticated.guard";
import {Perms} from "../auth/decorators/permissions.decorator";
import {ProfileService} from "./profile.service";
import {ChangePasswordDto} from "./dto/changePassword.dto";
import {ChangeUsernameDto} from "./dto/changeUsername.dto";
import {ChangeEmailDto} from "./dto/changeEmail.dto";

@UseGuards(AuthenticatedGuard)
@Perms('profile.show_profile')
@Controller('profile')
export class ProfileController {
    private logger = new Logger(ProfileController.name);
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

    @HttpCode(200)
    @Perms('profile.change_email')
    @Post('email')
    async sendChangeEmail(
        @Body() changeEmailDto: ChangeEmailDto,
        @Req() req
    ) {
        return this.profileService.sendChangeEmail(req.user.id, req, changeEmailDto)
    }

    @Perms('profile.change_email')
    @Get('email')
    async changeEmail(
        @Query('email') email: string,
        @Query('code') encryptedCode: string,
        @Req() req,
        @Res() res
    ) {
        try {
            if (email && encryptedCode) {
                await this.profileService.changeEmail(req.user, email, encryptedCode);
            }
            return res.status(200).json({msg: 'tutaj bedzie formularz do zmiany emaila'})
        } catch (e) {
            this.logger.error(e.message)
            return res.redirect('/api/profile/email')
        }
    }
}
