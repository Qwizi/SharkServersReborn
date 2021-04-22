import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect, ConnectedSocket, WsException
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BadGatewayException, CACHE_MANAGER, Inject, Logger } from "@nestjs/common";
import { SocketService } from "../../socket/socket.service";
import { Cache } from "cache-manager";
import { Observable } from "rxjs";
import { ServerData } from "../../servers/dto/serverData.dto";
import { SteamProfileService } from "../../steamprofile/steamProfile.service";
import { ServersService } from "../../servers/services/servers.service";
import { PlayersService } from "../../servers/services/players.service";
import { IPlayer, IServerCacheData } from 'src/server/servers/servers.interfaces';
import { ServerEvents } from 'src/server/servers/servers.enum';
import { PlayerStats } from 'src/server/servers/entity/playerStats.entity';
import { PlayersStatsService } from 'src/server/servers/services/playersStats.service';
import { Raw } from 'typeorm';


@WebSocketGateway(5000, { namespace: 'webclient' })
export class WebClientGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('ServersGateway');
	@WebSocketServer()
	server: Server;

	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private socketService: SocketService,
		private steamProfileService: SteamProfileService,
		private playersService: PlayersService,
		private playersStatsService: PlayersStatsService,
		private serversService: ServersService
	) {
	}

	afterInit(server: Server) {
		this.socketService.socket = server;
	}

	async getServerCacheKey(ip: string, port: number) {
		return `server_${ip}_${port}`
	}

	async getServerCacheData(ip: string, port: number): Promise<IServerCacheData | null> {
		try {
			const serverCacheKey = await this.getServerCacheKey(ip, port);
			return this.cacheManager.get<IServerCacheData>(serverCacheKey);
		} catch (e) {
			this.logger.error(e.message)
		}
	}

	async removeServerCacheData(ip: string, port: number) {
		try {
			const serverCacheKey = await this.getServerCacheKey(ip, port);
			await this.cacheManager.del(serverCacheKey);
		} catch (e) {
			this.logger.error(e.message)
		}
	}

	async setServerCacheData(ip: string, port: number, data: any, del?) {
		try {
			const serverCacheKey = await this.getServerCacheKey(ip, port);
			await this.cacheManager.set<IServerCacheData>(serverCacheKey, data, { ttl: 60 });
		} catch (e) {
			this.logger.error(e.message)
		}
	}

	async sendEventData({ ip, port }, event: any, cacheData: any) {
		this.server.to('webclient').emit('server_events', {
			event: event,
			server: {
				ip: ip,
				port: port,
				// @ts-ignore
				...cacheData
			}
		})
	}

	async findPlayer(steamid64: string, players: IPlayer[]) {
		const obj = players.find((player: IPlayer) => player.steamid64 == steamid64)
		const index = players.findIndex((player: IPlayer) => player.steamid64 == steamid64)
		return [obj, index]
	}

	handleConnection(socket: Socket, ...args: any[]) {
		this.logger.log(`Client ${socket.id} connected`)
		socket.on('join', data => {
			console.log(data);
			socket.join(data.room);
		})
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('send_server_data_to_cache')
	async sendServerDataToCache(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<Observable<WsResponse<any>> | any> {
		try {
			const { ip, port, ...result } = data;
			await this.setServerCacheData(ip, port, result, true);
			this.server.to('webclient').emit('get_server_data_from_cache', { ip, port, ...result })
		} catch (e) {
			this.logger.error(e.message)
		}
	}

	@SubscribeMessage('get_server_data_from_cache')
	async getServerDataFromCache(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<Observable<WsResponse<any>> | any> {
		try {
			const { ip, port } = data;
			const serverCacheData = await this.getServerCacheData(ip, port);
			if (serverCacheData) {
				this.server.to('webclient').emit('get_server_data_from_cache', { ip, port, ...serverCacheData })
			}
		} catch (e) {
			this.logger.error(e.message)
		}
	}

	@SubscribeMessage('server_events')
	async serverEvents(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<Observable<WsResponse<any>> | any> {
		if (!data || !data.event && !data.server && !data.event.type) throw new WsException('Invalid data');

		const playerConnectedEvent = async (data) => {
			try {
				const { server, event } = data;
				const { ip, port } = server;
				let serverCacheData = await this.getServerCacheData(ip, port);
				if (serverCacheData.playersCount < serverCacheData.max_players) {
					serverCacheData.playersCount++
				}


				const [playerObj, playerIndex] = await this.findPlayer(event.player.steamid64, serverCacheData.players);
				// @ts-ignore
				if (!playerObj && playerIndex == -1) serverCacheData.players.push(event.player)
				await this.setServerCacheData(ip, port, serverCacheData);
				const serverObj = await this.serversService.findOne({
					where: {
						ip: ip,
						port: port
					}
				})

				let playerSteamProfile = await this.steamProfileService.findOne({
					where: {
						steamid64: event.player.steamid64
					}
				})

				if (!playerSteamProfile) playerSteamProfile = await this.steamProfileService.create({ steamid64: event.player.steamid64 })

				let playerFromDb = await this.playersService.findOne({
					where: {
						steam_profile: playerSteamProfile,
						server: serverObj
					},
					relations: ['server', 'steam_profile', 'stats']
				})

				console.log(playerFromDb)

				if (!playerFromDb) {
					playerFromDb = await this.playersService._create({
						server: serverObj,
						steam_profile: playerSteamProfile
					})
					event.player = playerFromDb
				}
				else {
					event.player = playerFromDb
					const now = new Date().toLocaleDateString();
					let playerStats = await this.playersStatsService.findOne({
						where: {
							player: playerFromDb,
							date: now
						}
					})
					if (!playerStats) {
						playerStats = await this.playersStatsService._create();
						await this.playersService.addStats(playerFromDb, playerStats)
					}
					event.player.stats = playerStats
				}
				await this.sendEventData({ ip, port }, event, serverCacheData)
			} catch (e) {
				this.logger.error(e.message)
			}
		}

		const playerDisconnectedEvent = async (data) => {
			try {
				const { server, event } = data;
				const { ip, port } = server;
				let serverCacheData = await this.getServerCacheData(ip, port);
				if (serverCacheData) {
					serverCacheData.playersCount--;
					serverCacheData.players = serverCacheData.players.filter((player: IPlayer) => player.steamid64 != event.player.steamid64)
					await this.setServerCacheData(ip, port, serverCacheData);
					await this.sendEventData({ ip, port }, data.event, serverCacheData)
				}
			} catch (e) {
				this.logger.error(e.message)
			}

		}

		const playerChangeTeamEvent = async (data) => {
			try {
				const { server, event } = data;
				const { ip, port } = server;
				let serverCacheData = await this.getServerCacheData(ip, port);
				if (serverCacheData) {
					const [playerObj, playerIndex] = await this.findPlayer(event.player.steamid64, serverCacheData.players)
					if (playerObj && playerIndex !== -1) {
						// @ts-ignore
						playerObj.team = event.player.team;
						// @ts-ignore
						serverCacheData.players[playerIndex] = playerObj;
						await this.setServerCacheData(ip, port, serverCacheData);
						await this.sendEventData({ ip, port }, data.event, serverCacheData)
					}
				}
			} catch (e) {
				this.logger.error(e.message)
			}
		}

		const playerChangeClassEvent = async (data) => {
			try {
				const { server, event } = data;
				const { ip, port } = server;
				let serverCacheData = await this.getServerCacheData(ip, port);
				if (serverCacheData) {
					const [playerObj, playerIndex] = await this.findPlayer(event.player.steamid64, serverCacheData.players)
					if (playerObj && playerIndex !== -1) {
						// @ts-ignore
						playerObj.class_name = event.player.class_name;
						// @ts-ignore
						serverCacheData.players[playerIndex] = playerObj;
						await this.setServerCacheData(ip, port, serverCacheData);
						await this.sendEventData({ ip, port }, data.event, serverCacheData)
					}
				}
			} catch (e) {
				this.logger.error(e.message)
			}
		}

		const playerKillEvent = async (data) => {
			try {
				const { server, event } = data;
				const { ip, port } = server;
				let serverCacheData = await this.getServerCacheData(ip, port);
				if (serverCacheData) {
					const [playerObj, playerIndex] = await this.findPlayer(event.player.steamid64, serverCacheData.players)
					if (playerObj && playerIndex !== -1) {
						//@ts-ignore
						playerObj.stats.kills++;
						//@ts-ignore
						serverCacheData.players[playerIndex] = playerObj;
						await this.setServerCacheData(ip, port, serverCacheData);
						await this.sendEventData({ ip, port }, data.event, serverCacheData)
					}
				}
			} catch (e) {
				this.logger.error(e.message)
			}
		}

		const playerDeadEvent = async (data) => {
			try {
				const { server, event } = data;
				const { ip, port } = server;
				let serverCacheData = await this.getServerCacheData(ip, port);
				if (serverCacheData) {
					const [playerObj, playerIndex] = await this.findPlayer(event.player.steamid64, serverCacheData.players)
					if (playerObj && playerIndex !== -1) {
						//@ts-ignore
						playerObj.stats.kills--;
						//@ts-ignore
						serverCacheData.players[playerIndex] = playerObj;
						await this.setServerCacheData(ip, port, serverCacheData);
						await this.sendEventData({ ip, port }, data.event, serverCacheData)
					}
				}
			} catch (e) {
				this.logger.error(e.message)
			}
		}

		const mapChangedEvent = async (data) => {
			try {
				const { server, event } = data;
				const { ip, port } = server;
				let serverCacheData = await this.getServerCacheData(ip, port);
				if (serverCacheData) {
					serverCacheData.map = data.event.map;
					await this.setServerCacheData(ip, port, serverCacheData);
					await this.sendEventData({ ip, port }, data.event, serverCacheData)
				}
			} catch (e) {
				this.logger.error(e.message)
			}
		}

		const timeEvent = async (data) => {
			try {
				const { server, event } = data;
				const { ip, port } = server;
				let serverCacheData = await this.getServerCacheData(ip, port);
				if (serverCacheData) {
					serverCacheData.timeleft = event.timeleft;
					await this.setServerCacheData(ip, port, serverCacheData);
					await this.sendEventData({ ip, port }, data.event, serverCacheData)
				}
			} catch (e) {
				this.logger.error(e.message)
			}
		}

		switch (data.event.type) {
			case ServerEvents.PLAYER_CONNECTED: await playerConnectedEvent(data); break;
			case ServerEvents.PLAYER_DISCONNECTED: await playerDisconnectedEvent(data); break;
			case ServerEvents.PLAYER_CHANGE_TEAM: await playerChangeTeamEvent(data); break;
			case ServerEvents.PLAYER_CHANGE_CLASS: await playerChangeClassEvent(data); break;
			case ServerEvents.PLAYER_KILL: await playerKillEvent(data); break;
			case ServerEvents.PLAYER_DEAD: await playerDeadEvent(data); break;
			case ServerEvents.MAP_CHANGED: await mapChangedEvent(data); break;
			case ServerEvents.TIME: await timeEvent(data); break;
			default: throw new WsException('Bad event type');
		}

	}
}