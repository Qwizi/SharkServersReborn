import {Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import {LoginGuard} from "./guards/login.guard";
import {RegisterUserDto} from "../users/dto/registerUser.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
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

    @Get('register')
    async registerGet() {
        return;
    }


    @UseGuards(LoginGuard)
    @Post('login')
    async loginPost(@Req() req) {
        return req.user;
    }

    @Get('login')
    async loginGet() {
        return;
    }

    @Get('logout')
    logout(@Req() req, @Res() res) {
        req.logout();
        res.redirect('/')
    }
}
