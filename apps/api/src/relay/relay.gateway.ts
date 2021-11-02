import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class RelayGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private readonly logger = new Logger(RelayGateway.name);

  @WebSocketServer() server;
  users: number = 0;

  async handleConnection(){

    // A client has connected
    this.users++;
    this.logger.log(`Client #${this.users} connected.`);
    // Notify connected clients of current users
    this.server.emit('users', this.users);

  }

  async handleDisconnect(){

    // A client has disconnected
    this.users--;
    this.logger.log(`Client disconnected. Total connections: ${this.users}`);

    // Notify connected clients of current users
    this.server.emit('users', this.users);

  }

  @SubscribeMessage('chat')
  async onChat(client, message){
    client.broadcast.emit('chat', message);
  }

}
