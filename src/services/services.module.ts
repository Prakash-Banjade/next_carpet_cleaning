import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServicePageController } from './service-page.controller';
import { ServicePage_Service } from './service-page.service';
import { ServicePage } from './entities/service-page.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ServicePage])
  ],
  controllers: [ServicesController, ServicePageController],
  providers: [ServicesService, ServicePage_Service],
})
export class ServicesModule { }
