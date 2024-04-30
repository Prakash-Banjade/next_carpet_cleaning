import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enquiry } from './entities/enquiry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async create(createEnquiryDto: CreateEnquiryDto) {
    return await this.enquiryRepo.save(createEnquiryDto);
  }

  async findAll() {
    return this.enquiryRepo.find();
  }

  async findOne(id: string) {
    const result = await this.enquiryRepo.findOneBy(id);
    if (!result) {
      throw new NotFoundException('Enquiry not found');
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.enquiryRepo.findOneBy(id);
    return await this.enquiryRepo.softRemove(result);
  }
}
