import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
	OnGatewayConnection,
	OnGatewayDisconnect
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Server, Socket} from 'socket.io';
import {Logger} from "@nestjs/common";

@WebSocketGateway(5000, {namespace: 'servers'})
export class ServersGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('ServersGateway');
	@WebSocketServer()
	server: Server;

	@SubscribeMessage('events')
	findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
		return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
	}

	@SubscribeMessage('identity')
	async identity(@MessageBody() data: number): Promise<number> {
		return data;
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client ${client.id} connected`)
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}
}