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
import {Server, Socket} from 'socket.io';
import {BadGatewayException, CACHE_MANAGER, Inject, Logger} from "@nestjs/common";
import {SocketService} from "../../socket/socket.service";
import {Cache} from "cache-manager";
import {Observable} from "rxjs";
import {ServerData} from "../../servers/dto/serverData.dto";
import {SteamProfileService} from "../../steamprofile/steamProfile.service";

enum ServerEvents {
	PLAYER_CONNECTED = 'player_connected',
	PLAYER_DISCONNECTED = 'player_disconnected',
	MAP_CHANGED = 'map_changed',
	TIME = 'time'
}

interface IServerCacheData {
	name: string;
	players: number;
	max_players: number;
	map: string;
	timeleft: string;
}

@WebSocketGateway(5000, {namespace: 'webclient'})
export class WebClientGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('ServersGateway');
	@WebSocketServer()
	server: Server;

	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private socketService: SocketService,
		private steamProfileService: SteamProfileService
	) {
	}

	afterInit(server: Server) {
		this.socketService.socket = server;
	}

	async getServerCacheKey(ip: string, port: number) {
		return `server_${ip}_${port}`
	}

	async getServerCacheData(ip: string, port: number): Promise<IServerCacheData | null> {
		const serverCacheKey = await this.getServerCacheKey(ip, port);
		return this.cacheManager.get<IServerCacheData>(serverCacheKey);
	}

	async removeServerCacheData(ip: string, port: number) {
		const serverCacheKey = await this.getServerCacheKey(ip, port);
		await this.cacheManager.del(serverCacheKey);
	}

	async setServerCacheData(ip: string, port: number, data: any, del?) {
		const serverCacheKey = await this.getServerCacheKey(ip, port);
		/*if (del) await this.removeServerCacheData(ip, port);*/
		await this.cacheManager.set<IServerCacheData>(serverCacheKey, data, {ttl: 60});
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
		const {ip, port, ...result} = data;
		await this.setServerCacheData(ip, port, result, true);
		this.server.to('webclient').emit('get_server_data_from_cache', {ip, port, ...result})
	}

	@SubscribeMessage('get_server_data_from_cache')
	async getServerDataFromCache(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<Observable<WsResponse<any>> | any> {
		console.log(data);
		const {ip, port} = data;
		const serverCacheData = await this.getServerCacheData(ip, port);
		// @ts-ignore
		console.log(serverCacheData)
		// @ts-ignore
		this.server.to('webclient').emit('get_server_data_from_cache', {ip, port, ...serverCacheData})
	}

	@SubscribeMessage('player_connected')
	async playerConnected(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<Observable<WsResponse<any>> | any> {
		const {ip, port, ...result} = data;
		let serverCacheData = await this.getServerCacheData(ip, port);
		// @ts-ignore
		serverCacheData.players++;
		await this.setServerCacheData(ip, port, serverCacheData, false);
		this.server.to('webclient').emit('increment_players_count', {ip, port})
	}

	@SubscribeMessage('server_events')
	async serverEvents(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<Observable<WsResponse<any>> | any> {
		if (!data || !data.event && !data.server && !data.event.type) throw new WsException('Invalid data');
		const {ip, port} = data.server;

		const playerConnectedEvent = async (data) => {
			const {ip, port} = data.server;
			let serverCacheData = await this.getServerCacheData(ip, port);
			// @ts-ignore
			serverCacheData.players++
			await this.setServerCacheData(ip, port, serverCacheData);
			console.log(serverCacheData)
			this.server.to('webclient').emit('server_events', {
				event: data.event,
				server: {
					ip: ip,
					port: port,
					// @ts-ignore
					...serverCacheData
				}
			})
		}

		const playerDisconnectedEvent = async (data) => {
			const {ip, port} = data.server;
			let serverCacheData = await this.getServerCacheData(ip, port);
			// @ts-ignore
			serverCacheData.players--;
			await this.setServerCacheData(ip, port, serverCacheData);
			console.log(serverCacheData)
			this.server.to('webclient').emit('server_events', {
				event: data.event,
				server: {
					ip: ip,
					port: port,
					// @ts-ignore
					...serverCacheData
				}
			})
		}

		const mapChangedEvent = async (data) => {
			const {ip, port} = data.server;
			let serverCacheData = await this.getServerCacheData(ip, port);
			// @ts-ignore
			serverCacheData.map = data.event.map;
			await this.setServerCacheData(ip, port, serverCacheData);
			console.log(serverCacheData)
			this.server.to('webclient').emit('server_events', {
				event: data.event,
				server: {
					ip: ip,
					port: port,
					// @ts-ignore
					...serverCacheData
				}
			})
		}

		const timeEvent = async (data) => {
			const {ip, port} = data.server;
			let serverCacheData = await this.getServerCacheData(ip, port);
			// @ts-ignore
			serverCacheData.map = data.event.map;
			await this.setServerCacheData(ip, port, serverCacheData);
			console.log(serverCacheData)
			this.server.to('webclient').emit('server_events', {
				event: data.event,
				server: {
					ip: ip,
					port: port,
					// @ts-ignore
					...serverCacheData
				}
			})
		}

		switch (data.event.type) {
			case ServerEvents.PLAYER_CONNECTED: await playerConnectedEvent(data); break;
			case ServerEvents.PLAYER_DISCONNECTED: await playerDisconnectedEvent(data); break;
			case ServerEvents.MAP_CHANGED: await mapChangedEvent(data); break;
			case ServerEvents.TIME: await timeEvent(data); break;
			default: throw new WsException('Bad event type');
		}

	}
}