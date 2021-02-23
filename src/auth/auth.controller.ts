import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        console.log(req.user);
        return req.user;
    }
}
