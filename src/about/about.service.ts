import { Injectable } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutPage } from './entities/about.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class AboutService {

  constructor(
    @InjectRepository(AboutPage) private readonly aboutRepo: Repository<AboutPage>,
  ) { }
  async setData(createAboutDto: CreateAboutDto) {
    const existingAboutData = await this.aboutRepo.find();
    const bannerImage = createAboutDto.bannerImage && this.getFileName(createAboutDto.bannerImage);
    const coverImage = createAboutDto.coverImage && this.getFileName(createAboutDto.coverImage);

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

  async setBannerImage(banner: FileSystemStoredFile) {
    const bannerImage = banner ? this.getFileName(banner) : null;
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

  public getFileName(file: FileSystemStoredFile | string) {
    if (typeof file !== 'string') {
      const pathSegments = file?.path.split('\\');
      const fileName = pathSegments[pathSegments.length - 1];
      return fileName;
    } else return file;
  }
}
