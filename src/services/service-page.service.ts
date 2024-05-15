import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { ServicePage } from './entities/service-page.entity';
import { ServicePageDto } from './dto/service-page.dto';
import getImageUrl from '../utils/getImageUrl';
import { BannerImageDto } from '../utils/banner-image.dto';

@Injectable()
export class ServicePage_Service {

    constructor(@InjectRepository(ServicePage) private readonly servicePageRepo: Repository<ServicePage>) { }


    async setPageData(servicePageDto: ServicePageDto) {
        const { content, title } = servicePageDto

        // servicePageDto.bannerImage = this.getFileName(bannerImage)
        const bannerImage = getImageUrl(servicePageDto.bannerImage)

        const existingPageData = await this.servicePageRepo.find();

        if (!existingPageData?.length) {
            const newServicePageData = await this.servicePageRepo.save({
                content,
                bannerImage,
                title
            })

            return newServicePageData
        }

        Object.assign(existingPageData[0], {
            content,
            bannerImage,
            title
        })

        return await this.servicePageRepo.save(existingPageData[0])
    }

    async getPageData() {
        const servicePageData = await this.servicePageRepo.find();
        return servicePageData[0]
    }

    async setBannerImage(bannerImageDto: BannerImageDto) {
        // const bannerImage = banner && this.getFileName(banner)
        const bannerImage = getImageUrl(bannerImageDto.bannerImage)
        const existingAboutData = await this.servicePageRepo.find();

        if (!existingAboutData?.length) { // if no data is present in the database create a new one with banner image
            const newAboutData = await this.servicePageRepo.save({
                title: '',
                content: '',
                bannerImage,
            })

            return newAboutData;
        }

        Object.assign(existingAboutData[0], {
            bannerImage: bannerImage,
        })

        return await this.servicePageRepo.save(existingAboutData[0]);
    }

    public getFileName(file: FileSystemStoredFile | string) {
        if (typeof file !== 'string') {
            const pathSegments = file?.path.split('\\');
            const fileName = pathSegments[pathSegments.length - 1];
            return fileName;
        } else return file;
    }
}
