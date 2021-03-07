import {Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import {LoginGuard} from "./guards/login.guard";
import {RegisterUserDto} from "../users/dto/registerUser.dto";
import {AuthService} from "./auth.service";
import {AuthenticatedGuard} from "./guards/authenticated.guard";
import { AuthGuard } from '@nestjs/passport';
import {DisconnectAccountDto} from "./dto/disconnectAccount.dto";

@Controller('api/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    @HttpCode(200)
    async register(
        @Req() req,
        @Body() registerUserDto: RegisterUserDto
    ) {
        return await this.authService.registerUser(registerUserDto, req);
    }


    @UseGuards(LoginGuard)
    @Post('login')
    async login(@Req() req) {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Post('logout')
    async logout(@Req() req) {
        req.logout();
    }

    @UseGuards(AuthenticatedGuard, AuthGuard('steam'))
    @Get('connect-account/steam')
    async connectSteamAccount(
        @Req() req,
        @Res() res
    ) {
        res.redirect('/profile/connectedAccounts')
    }

    @UseGuards(AuthenticatedGuard)
    @HttpCode(200)
    @Post('disconnect-account')
    async disconnectAccount(
        @Req() req,
        @Body() disconnectAccountDto: DisconnectAccountDto
    ) {
        return this.authService.disconnectAccount(req.user, disconnectAccountDto);
    }
}
