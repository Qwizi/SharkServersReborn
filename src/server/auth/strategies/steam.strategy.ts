import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-steam';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(private authService: AuthService) {
    super({
      returnURL: 'http://localhost:3000/api/auth/connect-account/steam',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, identifier, profile): Promise<any> {
    profile.identifier = identifier;
    return await this.authService.connectSteamAccount(req.user, profile);
  }
}
