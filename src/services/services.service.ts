import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {

  constructor(@InjectRepository(Service) private readonly serviceRepo: Repository<Service>) { }


  async create(createServiceDto: CreateServiceDto) {
    return await this.serviceRepo.save(createServiceDto);
  }

  async findAll() {
    return await this.serviceRepo.find();
  }

  async findOne(id: string) {
    const existingService = await this.serviceRepo.findOneBy({ id });
    if (!existingService) throw new NotFoundException('Service not found');
    return existingService;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const existingService = await this.findOne(id)
    Object.assign(existingService, updateServiceDto);
    return await this.serviceRepo.save(existingService);
  }

  async remove(id: string) {
    const existingService = await this.findOne(id);
    return await this.serviceRepo.softRemove(existingService);
  }

  async restore(id: string) {
    const srevice = await this.serviceRepo.restore({ id });

    if (!srevice) throw new BadRequestException('Failed to restore service')
    return srevice
  }
}
