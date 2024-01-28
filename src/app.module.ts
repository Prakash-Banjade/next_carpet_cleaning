import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { BaseEntity } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ // nest env config 
      isGlobal: true
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BaseEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
