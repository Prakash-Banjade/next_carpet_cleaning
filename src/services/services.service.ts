import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class ServicesService {

  constructor(@InjectRepository(Service) private readonly serviceRepo: Repository<Service>) { }


  async create(createServiceDto: CreateServiceDto) {
    const { content, coverImage, title } = createServiceDto

    if (coverImage instanceof FileSystemStoredFile) {
      const pathSegments = coverImage?.path.split('\\');
      const fileName = pathSegments[pathSegments.length - 1];
      createServiceDto.coverImage = fileName;
    }

    return await this.serviceRepo.save({
      content,
      title,
      coverImage: createServiceDto.coverImage as string || null,
    });
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

    if (updateServiceDto?.coverImage instanceof FileSystemStoredFile) {
      const pathSegments = updateServiceDto?.coverImage?.path.split('\\');
      const fileName = pathSegments[pathSegments.length - 1];
      updateServiceDto.coverImage = fileName;
    }

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
