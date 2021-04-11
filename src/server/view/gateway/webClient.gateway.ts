import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
	OnGatewayConnection,
	OnGatewayDisconnect
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger} from "@nestjs/common";

@WebSocketGateway(5000, {namespace: 'webclient'} )
export class WebClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('ServersGateway');
	@WebSocketServer()
	server: Server;

	@SubscribeMessage('jd')
	async jd(@MessageBody() data) {
		console.log(data);
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client ${client.id} connected`)
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}
}