import { Module } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSection } from './entities/heroSection.entity';
import { HeroSectionService } from './hero-section/heroSection.service';
import { HeroSectionController } from './hero-section/heroSection.controller';
import { TopQualityController } from './topQuality/topQuality.controller';
import { TopQualityService } from './topQuality/topQuality.service';
import { TopQuality } from './entities/topQuality.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeroSection, TopQuality]),
  ],
  controllers: [HomePageController, HeroSectionController, TopQualityController],
  providers: [HomePageService, HeroSectionService, TopQualityService],
})
export class HomePageModule {}
