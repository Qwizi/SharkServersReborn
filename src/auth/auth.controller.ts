import {Controller, Get, Post, Req, Request, Res, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {LoginGuard} from "./guards/login.guard";

@Controller('auth')
export class AuthController {
    @UseGuards(LoginGuard)
    @Post('login')
    async login(@Request() req) {
        console.log(req.user);
        return req.user;
    }

    @Get("logout")
    logout(@Req() req, @Res() res) {
        req.logout();
        res.redirect('/')
    }
}
