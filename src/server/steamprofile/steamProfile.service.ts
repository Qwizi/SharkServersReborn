import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SteamProfile} from "./steamProfile.entity";
import {Repository} from "typeorm";
import {CreateSteamProfileDto} from "./dto/createSteamProfile.dto";
import {CreateSteamProfileWithSteamID64OnlyDto} from "./dto/createSteamProfileWithSteamID64Only.dto";
import * as SteamApi from 'steamapi';
import * as SteamID from 'steamid';
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {User} from "../users/users.entity";
import {RemoveOptions} from "typeorm/browser";
import {UpdateUserDto} from "../users/dto/updateUser.dto";
import {UpdateSteamProfileDto} from "./dto/updateSteamProfile.dto";


@Injectable()
export class SteamProfileService implements OnModuleInit {
    steamApi: any;

    constructor(@InjectRepository(SteamProfile) private steamProfileRepository: Repository<SteamProfile>) {
        this.steamApi = new SteamApi(process.env.STEAM_API_KEY);
    }

    async onModuleInit() {
        console.log(await this.findOne());
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

    async find(options?: FindManyOptions): Promise<SteamProfile[]> {
        return this.steamProfileRepository.find(options);
    }

    async findOne(options?: FindOneOptions<SteamProfile>): Promise<SteamProfile | undefined> {
        return this.steamProfileRepository.findOne(options);
    }

    async update(steamProfile: SteamProfile, updateSteamProfileDto: UpdateSteamProfileDto): Promise<SteamProfile> {
        steamProfile.nickname = updateSteamProfileDto.nickname || steamProfile.nickname;
        steamProfile.steamid64 = updateSteamProfileDto.steamid64 || steamProfile.steamid64;
        steamProfile.steamid32 = updateSteamProfileDto.steamid32 || steamProfile.steamid32;
        steamProfile.avatar = updateSteamProfileDto.avatar || steamProfile.avatar;
        steamProfile.avatar_medium = updateSteamProfileDto.avatar_medium || steamProfile.avatar_medium;
        steamProfile.avatar_full = updateSteamProfileDto.avatar_full || steamProfile.avatar_full;
        steamProfile.url = updateSteamProfileDto.url || steamProfile.url;
        await this.steamProfileRepository.save(steamProfile);
        return steamProfile;
    }


    async remove(entity: SteamProfile, options?: RemoveOptions): Promise<any> {
        return options ? this.steamProfileRepository.remove(entity, options) : this.steamProfileRepository.remove(entity);
    }
}
