import {Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import {LoginGuard} from "./guards/login.guard";
import {RegisterUserDto} from "../users/dto/registerUser.dto";
import {AuthService} from "./auth.service";

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

    @Get('logout')
    async logout(@Req() req, @Res() res) {
        await req.session.destroy()
    }
}
