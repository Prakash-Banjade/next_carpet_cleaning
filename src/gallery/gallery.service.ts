import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import getImageUrl from '../utils/getImageUrl';
import { ServicesService } from '../services/services.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepo: Repository<Gallery>,
    private readonly servicesService: ServicesService,
  ) {}

  async create(createGalleryDto: CreateGalleryDto) {
    const service = await this.servicesService.findOne(
      createGalleryDto.serviceId,
    );

    const images: string[] = [];

    for (const image of createGalleryDto.images) {
      const url = getImageUrl(image);
      images.push(url);
    }

    const gallery = this.galleryRepo.create({
      title: createGalleryDto.title,
      images: images || [],
      service,
    });

    return await this.galleryRepo.save(gallery);
  }

  async findAll() {
    return await this.galleryRepo.find({
      order: {
        createdAt: 'ASC',
      },
      relations: {
        service: true,
      },
    });
  }

  async findOne(id: string) {
    const existingGallery = await this.galleryRepo.findOne({
      where: {
        id,
      },
      relations: {
        service: true,
      },
    });
    if (!existingGallery) throw new NotFoundException('Gallery not found');
    return existingGallery;
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto) {
    const service = await this.servicesService.findOne(
      updateGalleryDto.serviceId,
    );

    const existingGallery = await this.findOne(id);

    const { images, previousImages, title } = updateGalleryDto;

    const imagesUrlArray: string[] = [];

    if (images?.length) {
      for (const image of images) {
        const url = getImageUrl(image);
        imagesUrlArray.push(url);
      }
    }

    // previousImagesArray can be a single image or an array, so handle accordingly
    const previousImagesArray =
      previousImages instanceof Array
        ? previousImages
        : typeof previousImages === 'string'
          ? [previousImages]
          : [];

    Object.assign(existingGallery, {
      title,
      images: [...previousImagesArray, ...imagesUrlArray],
      service,
    });

    return await this.galleryRepo.save(existingGallery);
  }

  async remove(id: string) {
    const existingGallery = await this.findOne(id);
    return await this.galleryRepo.softRemove(existingGallery);
  }

  async restore(id: string) {
    const blog = await this.galleryRepo.restore({ id });

    if (!blog) throw new BadRequestException('Failed to restore blog');
    return blog;
  }

  public getFileName(file: FileSystemStoredFile | string) {
    if (typeof file !== 'string') {
      const pathSegments = file?.path.split('\\');
      const fileName = pathSegments[pathSegments?.length - 1];
      return fileName;
    } else return file;
  }
}
