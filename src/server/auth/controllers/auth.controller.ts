import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { LoginGuard } from '../guards/login.guard';
import { RegisterUserDto } from '../../users/dto/registerUser.dto';
import { AuthService } from '../services/auth.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { AuthGuard } from '@nestjs/passport';
import { DisconnectAccountDto } from '../dto/disconnectAccount.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

@ApiTags('auth')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  async register(@Req() req, @Body() registerUserDto: RegisterUserDto) {
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
  async connectSteamAccount(@Req() req, @Res() res) {
    res.redirect('/profile/connectedAccounts');
  }

  @UseGuards(AuthenticatedGuard)
  @HttpCode(200)
  @Post('disconnect-account')
  async disconnectAccount(
    @Req() req,
    @Body() disconnectAccountDto: DisconnectAccountDto,
  ) {
    return this.authService.disconnectAccount(req.user, disconnectAccountDto);
  }
}

@ApiTags('auth')
@Controller({
  version: '2',
  path: 'auth',
})
export class AuthControllerV2 {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  async register(@Req() req, @Body() registerUserDto: RegisterUserDto) {
    return await this.authService.registerUser(registerUserDto, req);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, AuthGuard('steam'))
  @Get('connect-account/steam')
  async connectSteamAccount(@Req() req, @Res() res) {
    res.redirect('/profile/connectedAccounts');
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('disconnect-account')
  async disconnectAccount(
    @Req() req,
    @Body() disconnectAccountDto: DisconnectAccountDto,
  ) {
    return this.authService.disconnectAccount(req.user, disconnectAccountDto);
  }
}
