import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteamProfile } from './steamProfile.entity';
import { SteamProfileService } from './steamProfile.service';

@Module({
  imports: [TypeOrmModule.forFeature([SteamProfile])],
  providers: [SteamProfileService],
  exports: [SteamProfileService],
})
export class SteamProfileModule {}
