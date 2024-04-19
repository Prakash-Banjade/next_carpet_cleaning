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
import { PricingOffer } from './entities/pricingOffer.entity';
import { PricingOfferController } from './pricing-offer/pricing-offer.controller';
import { PricingOfferService } from './pricing-offer/pricing-offer.service';
import { CurrentOffer } from './entities/currentOffers.entity';
import { CurrentOfferController } from './current-offers/currentOffer.controller';
import { CurrentOfferService } from './current-offers/currentOffer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeroSection, TopQuality, PricingOffer, CurrentOffer]),
  ],
  controllers: [HomePageController, HeroSectionController, TopQualityController, PricingOfferController, CurrentOfferController],
  providers: [HomePageService, HeroSectionService, TopQualityService, PricingOfferService, CurrentOfferService],
})
export class HomePageModule { }
