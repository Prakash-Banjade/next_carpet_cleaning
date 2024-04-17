import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { GalleryPage } from './entities/gallery-page.entity';
import { GalleryPageDto } from './dto/gallery-page.dto';

@Injectable()
export class GalleryPageService {
    constructor(
        @InjectRepository(GalleryPage) private readonly galleryRepo: Repository<GalleryPage>,
    ) { }

    async getPageData() {
        const galleryPageData = await this.galleryRepo.find();
        return galleryPageData[0];
    }

    async setPageData(galleryPageDto: GalleryPageDto) {
        const existingPageData = await this.galleryRepo.find()
        const bannerImage = galleryPageDto.bannerImage && this.getFileName(galleryPageDto.bannerImage)

        if (!existingPageData?.length) {
            const newGalleryData = await this.galleryRepo.save({
                ...galleryPageDto,
                bannerImage,
            })

            return newGalleryData;
        }

        Object.assign(existingPageData[0], {
            bannerImage,
        })

        return await this.galleryRepo.save(existingPageData[0]);
    }

    async setBannerImage(banner: FileSystemStoredFile) {
        const bannerImage = banner && this.getFileName(banner)
        const existingAboutData = await this.galleryRepo.find();

        if (!existingAboutData?.length) { // if no data is present in the database create a new one with banner image
            const newAboutData = await this.galleryRepo.save({
                title: '',
                content: '',
                bannerImage,
            })

            return newAboutData;
        }

        Object.assign(existingAboutData[0], {
            bannerImage: bannerImage,
        })

        return await this.galleryRepo.save(existingAboutData[0]);
    }

    public getFileName(file: FileSystemStoredFile | string) {
        if (typeof file !== 'string') {
            const pathSegments = file?.path.split('\\');
            const fileName = pathSegments[pathSegments.length - 1];
            return fileName;
        } else return file;
    }
}
