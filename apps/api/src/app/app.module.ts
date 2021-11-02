import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RelayGateway } from '../relay/relay.gateway';
import { RelayModule } from '../relay/relay.module';

@Module({
  imports: [RelayModule],
  controllers: [AppController],
  providers: [AppService, RelayGateway],
})
export class AppModule {}
