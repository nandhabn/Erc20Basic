import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { BlockchainModule } from './modules/blockchain/blockchain.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] }), BlockchainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
