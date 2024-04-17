import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { GalleryPageController } from './gallery-page.controller';
import { GalleryPageService } from './gallery-page.service';
import { GalleryPage } from './entities/gallery-page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery, GalleryPage])],
  controllers: [GalleryController, GalleryPageController],
  providers: [GalleryService, GalleryPageService],
})
export class GalleryModule { }
