import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SteamProfile} from "./steamProfile.entity";
import {Repository} from "typeorm";
import {CreateSteamProfileDto} from "./dto/createSteamProfile.dto";
import {CreateSteamProfileWithSteamID64OnlyDto} from "./dto/createSteamProfileWithSteamID64Only.dto";
import * as SteamApi from 'steamapi';
import * as SteamID from 'steamid';


@Injectable()
export class SteamProfileService implements OnModuleInit {
    steamApi: any;

    constructor(@InjectRepository(SteamProfile) private steamProfileRepository: Repository<SteamProfile>) {
        this.steamApi = new SteamApi(process.env.STEAM_API_KEY);
    }

    async onModuleInit() {
    }

    async _create(createSteamProfileDto: CreateSteamProfileDto): Promise<SteamProfile> {
        const steamProfile = await this.steamProfileRepository.create(createSteamProfileDto)
        await this.steamProfileRepository.save(steamProfile);
        return steamProfile
    }

    async create(createSteamProfileWithSteamID64OnlyDto: CreateSteamProfileWithSteamID64OnlyDto): Promise<SteamProfile> {
        const {steamid64} = createSteamProfileWithSteamID64OnlyDto;
        const player = await this.steamApi.getUserSummary(steamid64);
        const sid = new SteamID(steamid64);
        const steamProfile = await this._create({
            nickname: player.nickname,
            steamid64: steamid64,
            steamid32: sid.getSteam2RenderedID(true),
            avatar: player.avatar.small,
            avatar_medium: player.avatar.medium,
            avatar_full: player.avatar.full,
            url: player.url
        })
        return steamProfile
    }
}
