import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { SocketService } from '../../socket/socket.service';
import { Observable } from 'rxjs';
import { Cache } from 'cache-manager';
import { ServerData } from '../dto/serverData.dto';

@WebSocketGateway(5000, { namespace: 'servers' })
export class ServersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('ServersGateway');
  @WebSocketServer()
  server: Server;

  constructor(
    private socketService: SocketService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Server client ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Server client disconnected: ${client.id}`);
  }

  @SubscribeMessage('get_server_data')
  async getData(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<Observable<WsResponse<any>> | any> {
    console.log(data);
    const serversCacheData = await this.cacheManager.get<ServerData[]>(
      'servers_data',
    );
    if (!serversCacheData) {
      await this.cacheManager.set('servers_data', [data]);
    } else {
      const serverExist = serversCacheData.find((s) => s.ip == data.ip);
      if (serverExist) {
        const serverIndex = serversCacheData.indexOf(serverExist);
        serversCacheData[serverIndex] = data;
        await this.cacheManager.set('servers_data', serversCacheData, {
          ttl: 5000,
        });
      } else {
        await this.cacheManager.set(
          'servers_data',
          [...serversCacheData, data],
          { ttl: 5000 },
        );
      }
    }
    this.server.of('/webclient').emit('get_server_data', serversCacheData);
  }
}
