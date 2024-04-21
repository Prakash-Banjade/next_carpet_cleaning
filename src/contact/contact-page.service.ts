import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileSystemStoredFile, MemoryStoredFile } from 'nestjs-form-data';
import { ContactPage } from './entities/contact-page.entity';
import { ContactPageDto } from './dto/contact-page.dto';
import getImageUrl from 'src/utils/getImageUrl';
import { BannerImageDto } from 'src/utils/banner-image.dto';

@Injectable()
export class ContactPageService {
    constructor(
        @InjectRepository(ContactPage) private readonly contactRepo: Repository<ContactPage>,
    ) { }

    async getPageData() {
        const contactPageData = await this.contactRepo.find();
        console.log(contactPageData)
        return contactPageData[0];
    }

    async setPageData(contactPageDto: ContactPageDto) {
        const existingPageData = await this.contactRepo.find()
        // const bannerImage = contactPageDto.bannerImage ? this.getFileName(contactPageDto.bannerImage) : null;
        const bannerImage = await getImageUrl(contactPageDto.bannerImage);

        if (!existingPageData?.length) {
            const newcontactData = await this.contactRepo.save({
                ...contactPageDto,
                bannerImage,
            })

            return newcontactData;
        }

        Object.assign(existingPageData[0], {
            bannerImage,
        })

        return await this.contactRepo.save(existingPageData[0]);
    }

    async setBannerImage(bannerImageDto: BannerImageDto) {
        // const bannerImage = banner && this.getFileName(banner)
        const bannerImage = await getImageUrl(bannerImageDto.bannerImage);
        const existingcontactData = await this.contactRepo.find();

        if (!existingcontactData?.length) { // if no data is present in the database create a new one with banner image
            const newcontactData = await this.contactRepo.save({
                title: '',
                content: '',
                bannerImage,
            })

            return newcontactData;
        }

        Object.assign(existingcontactData[0], {
            bannerImage: bannerImage,
        })

        return await this.contactRepo.save(existingcontactData[0]);
    }

    public getFileName(file: FileSystemStoredFile | string) {
        if (typeof file !== 'string') {
            const pathSegments = file?.path.split('\\');
            const fileName = pathSegments[pathSegments.length - 1];
            return fileName;
        } else return file;
    }
}
