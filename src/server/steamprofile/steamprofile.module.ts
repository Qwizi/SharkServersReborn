import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SteamProfile} from "./steamprofile.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SteamProfile])],
})
export class SteamprofileModule {}
