import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutPage } from './entities/about.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AboutPage])
  ],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule { }
