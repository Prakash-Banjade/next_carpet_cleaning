import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq) private readonly faqRepo: Repository<Faq>,
  ) { }

  async create(createFaqDto: CreateFaqDto) {
    return await this.faqRepo.save(createFaqDto);
  }

  async findAll() {
    return await this.faqRepo.find({
      order: {
        createdAt: 'asc'
      }
    })
  }

  async findOne(id: string) {
    const existingFaq = await this.faqRepo.findOneBy({ id })
    if (!existingFaq) throw new NotFoundException('Faq not found')

    return existingFaq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    const existingFaq = await this.findOne(id)
    Object.assign(existingFaq, updateFaqDto)
    return await this.faqRepo.save(existingFaq)
  }

  async remove(id: string) {
    const existingFaq = await this.findOne(id)
    if (!existingFaq) throw new BadRequestException('Cannot perform delete operation. FAQ does not exists.')
    return await this.faqRepo.softRemove(existingFaq)
  }

  async restore(id: string) {
    const faq = await this.faqRepo.restore(id)
    if (!faq) throw new BadRequestException('Cannot perform restore operation. FAQ does not exists.')
    return faq;
  }
}
