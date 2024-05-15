import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentOffer } from '../entities/currentOffers.entity';
import { CreateCurrentOfferDto } from '../dto/create-currentOffer.dto';
import { FileSystemStoredFile } from 'nestjs-form-data';
import getImageUrl from '../../utils/getImageUrl';
import { UpdateCurrentOfferDto } from '../dto/update-currentOffer.dto';

@Injectable()
export class CurrentOfferService {
  constructor(
    @InjectRepository(CurrentOffer) private readonly currentOfferRepo: Repository<CurrentOffer>,
  ) { }

  async create(createCurrentOfferDto: CreateCurrentOfferDto) {
    // const image = currentOfferDto.image && this.getFileName(currentOfferDto.image);
    const image = getImageUrl(createCurrentOfferDto.image);

    const newPricing = this.currentOfferRepo.create({
      ...createCurrentOfferDto,
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

  async update(id: string, updateCurrentOfferDto: UpdateCurrentOfferDto) {
    const existingOffer = await this.findOne(id)

    // const image = updateCurrentOfferDto.image && this.getFileName(updateCurrentOfferDto.image);
    const image = getImageUrl(updateCurrentOfferDto.image);

    Object.assign(existingOffer, {
      ...updateCurrentOfferDto,
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
