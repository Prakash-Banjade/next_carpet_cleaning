import { Injectable } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutPage } from './entities/about.entity';
import { Repository } from 'typeorm';
import getImageUrl from '../utils/getImageUrl';
import { BannerImageDto } from '../utils/banner-image.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutPage) private readonly aboutRepo: Repository<AboutPage>,
  ) { }
  async setData(createAboutDto: CreateAboutDto) {
    const existingAboutData = await this.aboutRepo.find();

    const bannerImage = getImageUrl(createAboutDto.bannerImage);
    const coverImage = getImageUrl(createAboutDto.coverImage);

    if (!existingAboutData.length) {
      const newAboutData = await this.aboutRepo.save({
        title: createAboutDto.title,
        content: createAboutDto.content,
        bannerImage,
        coverImage
      })

      return newAboutData;
    }

    Object.assign(existingAboutData[0], {
      title: createAboutDto.title,
      content: createAboutDto.content,
      bannerImage,
      coverImage
    })

    return await this.aboutRepo.save(existingAboutData[0]);
  }

  async getData() {
    const aboutData = await this.aboutRepo.find();
    if (!aboutData?.length) return null;

    const aboutPageData = aboutData[0];
    return aboutPageData;
  }

  async setBannerImage(bannerImageDto: BannerImageDto) {
    const bannerImage = getImageUrl(bannerImageDto.bannerImage);
    const existingAboutData = await this.aboutRepo.find();

    if (!existingAboutData?.length) { // if no data is present in the database create a new one with banner image
      const newAboutData = await this.aboutRepo.save({
        title: '',
        content: '',
        coverImage: null,
        bannerImage,
      })

      return newAboutData;
    }

    Object.assign(existingAboutData[0], {
      bannerImage: bannerImage,
    })

    return await this.aboutRepo.save(existingAboutData[0]);
  }
}
