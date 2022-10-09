import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import {
  AuthController,
  AuthControllerV2,
} from './controllers/auth.controller';
import { SessionSerializer } from './sessions.serializer';
import { MailModule } from '../mail/mail.module';
import { AuthenticatorModule } from '../authenticator/authenticator.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './guards/permissions.guard';
import { SteamProfileModule } from '../steamprofile/steamProfile.module';
import { SteamStrategy } from './strategies/steam.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    AuthenticatorModule,
    MailModule,
    SteamProfileModule,
    JwtModule.register({
      secret: 'dupa',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    SteamStrategy,
    LocalStrategy,
    SessionSerializer,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    JwtStrategy,
  ],
  controllers: [AuthController, AuthControllerV2],
  exports: [AuthService],
})
export class AuthModule {}
