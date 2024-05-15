import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingOffer } from '../entities/pricingOffer.entity';
import { PricingOfferDto } from '../dto/pricingOffer.dto';

@Injectable()
export class PricingOfferService {
  constructor(
    @InjectRepository(PricingOffer)
    private readonly pricingOfferRepo: Repository<PricingOffer>,
  ) {}

  async setData(pricingOfferDto: PricingOfferDto) {
    const existingPricingOfferData = await this.pricingOfferRepo.find();

    if (!existingPricingOfferData.length) {
      const newPricingOfferData = await this.pricingOfferRepo.save({
        title: pricingOfferDto.title,
        description: pricingOfferDto.description,
      });

      return newPricingOfferData;
    }

    Object.assign(existingPricingOfferData[0], {
      title: pricingOfferDto.title,
      description: pricingOfferDto.description,
    });

    return await this.pricingOfferRepo.save(existingPricingOfferData[0]);
  }

  async getData() {
    const pricingOfferData = await this.pricingOfferRepo.find();
    if (!pricingOfferData?.length) return {};

    const pricingOfferPageData = pricingOfferData[0];
    return pricingOfferPageData;
  }

  async update(pricingOfferDto: PricingOfferDto) {
    const existingPricing = await this.pricingOfferRepo.find();

    Object.assign(existingPricing[0], pricingOfferDto);
    return await this.pricingOfferRepo.save(existingPricing);
  }
}
