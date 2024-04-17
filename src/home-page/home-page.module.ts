import { Module } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSection } from './entities/heroSection.entity';
import { HeroSectionService } from './hero-section/heroSection.service';
import { HeroSectionController } from './hero-section/heroSection.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeroSection]),
  ],
  controllers: [HomePageController, HeroSectionController],
  providers: [HomePageService, HeroSectionService],
})
export class HomePageModule {}
