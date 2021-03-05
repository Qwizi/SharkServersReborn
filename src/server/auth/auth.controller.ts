import {Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import {LoginGuard} from "./guards/login.guard";
import {RegisterUserDto} from "../users/dto/registerUser.dto";
import {AuthService} from "./auth.service";
import {AuthenticatedGuard} from "./guards/authenticated.guard";

@Controller('api/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    @HttpCode(200)
    async registerPost(
        @Req() req,
        @Body() registerUserDto: RegisterUserDto
    ) {
        return await this.authService.registerUser(registerUserDto, req);
    }


    @UseGuards(LoginGuard)
    @Post('login')
    async loginPost(@Req() req) {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Post('logout')
    async logout(@Req() req) {
        req.logout();
    }
}
