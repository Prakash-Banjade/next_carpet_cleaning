import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pricing } from './entities/pricing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PricingsService {
  constructor(
    @InjectRepository(Pricing) private readonly pricingRepo: Repository<Pricing>,
  ) { }

  async create(createPricingDto: CreatePricingDto) {
    const newPricing = this.pricingRepo.create(createPricingDto);

    return await this.pricingRepo.save(newPricing);
  }

  async findAll() {
    return await this.pricingRepo.find();
  }

  async findOne(id: string) {
    const existingPricing = await this.pricingRepo.findOneBy({ id });

    if (!existingPricing) throw new NotFoundException('Pricing not found');

    return existingPricing;
  }

  async update(id: string, updatePricingDto: UpdatePricingDto) {
    const existingPricing = await this.findOne(id)

    Object.assign(existingPricing, updatePricingDto);
    return await this.pricingRepo.save(existingPricing);
  }

  async remove(id: string) {
    const existingPricing = await this.findOne(id);
    return await this.pricingRepo.softRemove(existingPricing);
  }
}
