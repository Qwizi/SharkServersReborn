import {Body, Controller, Get, Post, Req, Request, Res, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {LoginGuard} from "./guards/login.guard";
import {RegisterUserDto} from "../users/dto/registerUser.dto";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @Post('register')
    async registerPost(
        @Req() req,
        @Res() res,
        @Body() registerUserDto: RegisterUserDto
    ) {
        if (req.user) res.redirect('/');
        const newUser = await this.usersService.register(registerUserDto);
        const [code, encryptedCode] = await this.authService.createActivateCode(newUser);
        const url = await this.authService.getAccountActivateUrl(req, encryptedCode);
        await this.authService.sendVerificationEmail(newUser, code, url);
        return newUser;
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
