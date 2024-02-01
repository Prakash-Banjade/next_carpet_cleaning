import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class GalleryService {
  constructor(@InjectRepository(Gallery) private readonly galleryRepo: Repository<Gallery>) { }

  async create(createGalleryDto: CreateGalleryDto) {
    console.log(createGalleryDto);

    const images: string[] = [];

    if (createGalleryDto.images instanceof Array) { // checking for array because file can be single also
      createGalleryDto.images?.map((image: FileSystemStoredFile | string) => {
        const fileName = this.getFileName(image);
        images.push(fileName);
      })
    } else {
      const singleImage = createGalleryDto.images as FileSystemStoredFile; // FormDataRequest doesn't create array for single file upload
      const fileName = this.getFileName(singleImage);
      images.push(fileName);
    }

    return await this.galleryRepo.save({
      title: createGalleryDto.title,
      images: images || []
    })
  }

  async findAll() {
    return await this.galleryRepo.find({
      order: {
        createdAt: 'ASC'
      }
    });
  }

  async findOne(id: string) {
    const existingGallery = await this.galleryRepo.findOneBy({ id });
    if (!existingGallery) throw new NotFoundException('Gallery not found');
    return existingGallery;
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto) {
    const existingGallery = await this.findOne(id);

    console.log(updateGalleryDto);

    const images: string[] = updateGalleryDto?.previousImages instanceof Array ? updateGalleryDto?.previousImages : typeof updateGalleryDto?.previousImages === 'string' ? [updateGalleryDto?.previousImages] : [];

    console.log(images);

    updateGalleryDto.images instanceof Array ? updateGalleryDto.images?.map((image: FileSystemStoredFile) => {
      images.push(this.getFileName(image));
    }) : updateGalleryDto.images && images.push(this.getFileName(updateGalleryDto.images));

    Object.assign(existingGallery, {
      title: updateGalleryDto.title,
      images: images || []
    });

    return await this.galleryRepo.save(existingGallery);
  }

  async remove(id: string) {
    const existingGallery = await this.findOne(id);
    return await this.galleryRepo.softRemove(existingGallery);
  }

  async restore(id: string) {
    const blog = await this.galleryRepo.restore({ id });

    if (!blog) throw new BadRequestException('Failed to restore blog')
    return blog
  }

  public getFileName(file: FileSystemStoredFile | string) {
    if (typeof file !== 'string') {
      const pathSegments = file?.path.split('\\');
      const fileName = pathSegments[pathSegments?.length - 1];
      return fileName;
    } else return file;
  }
}
