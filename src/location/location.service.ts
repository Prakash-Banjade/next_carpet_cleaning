import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationRepo.save(createLocationDto);
  }

  async findAll() {
    return await this.locationRepo.find();
  }

  async findOne(id: string) {
    const existingLocation = await this.locationRepo.findOneBy({ id });
    if (!existingLocation) {
      throw new NotFoundException();
    }
    return existingLocation;
  }

  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    const existingLocation = await this.locationRepo.findBy({ id });
    if (!existingLocation) {
      throw new NotFoundException();
    }
    return await this.locationRepo.save(updateLocationDto);
  }

  async remove(id: string) {
    const existingGallery = await this.findOne(id);
    return await this.locationRepo.remove(existingGallery);
  }
}
