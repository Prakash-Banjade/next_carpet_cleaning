import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentOffer } from '../entities/currentOffers.entity';
import { CurrentOfferDto } from '../dto/currentOffer.dto';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class CurrentOfferService {
  constructor(
    @InjectRepository(CurrentOffer) private readonly currentOfferRepo: Repository<CurrentOffer>,
  ) { }

  async create(currentOfferDto: CurrentOfferDto) {
    const image = currentOfferDto.image && this.getFileName(currentOfferDto.image);

    const newPricing = this.currentOfferRepo.create({
      ...currentOfferDto,
      image
    });

    return await this.currentOfferRepo.save(newPricing);
  }

  async findAll() {
    return await this.currentOfferRepo.find({
      order: {
        createdAt: 'ASC',
      }
    });
  }

  async findOne(id: string) {
    const existingOffer = await this.currentOfferRepo.findOneBy({ id });

    if (!existingOffer) throw new NotFoundException('Offer not found');

    return existingOffer;
  }

  async update(id: string, currentOfferDto: CurrentOfferDto) {
    const existingOffer = await this.findOne(id)

    const image = currentOfferDto.image && this.getFileName(currentOfferDto.image);

    Object.assign(existingOffer, {
      ...currentOfferDto,
      image
    });
    return await this.currentOfferRepo.save(existingOffer);
  }

  async remove(id: string) {
    const existingOffer = await this.findOne(id);
    return await this.currentOfferRepo.softRemove(existingOffer);
  }

  public getFileName(file: FileSystemStoredFile | string) {
    if (typeof file !== 'string') {
      const pathSegments = file?.path.split('\\');
      const fileName = pathSegments[pathSegments.length - 1];
      return fileName;
    } else return file;
  }

}
