import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroSection } from '../entities/heroSection.entity';
import { HeroSectionDto } from '../dto/heroSection.dto';
import getImageUrl from '../../utils/getImageUrl';

@Injectable()
export class HeroSectionService {

  constructor(
    @InjectRepository(HeroSection) private readonly heroRepo: Repository<HeroSection>,
  ) { }
  async setData(heroSectionDto: HeroSectionDto) {
    const existingheroData = await this.heroRepo.find();
    // const image = heroSectionDto.image && this.getFileName(heroSectionDto.image);
    const image = getImageUrl(heroSectionDto.image);

    if (!existingheroData.length) {
      const newheroData = await this.heroRepo.save({
        title: heroSectionDto.title,
        subtitle: heroSectionDto.subtitle,
        description: heroSectionDto.description,
        image,
      })

      return newheroData;
    }

    Object.assign(existingheroData[0], {
      title: heroSectionDto.title,
      subtitle: heroSectionDto.subtitle,
      content: heroSectionDto.description,
      image,
    })

    return await this.heroRepo.save(existingheroData[0]);
  }

  async getData() {
    const heroData = await this.heroRepo.find();
    if (!heroData?.length) return {};

    const heroPageData = heroData[0];
    return heroPageData;
  }

  public getFileName(file: FileSystemStoredFile | string) {
    if (typeof file !== 'string') {
      const pathSegments = file?.path.split('\\');
      const fileName = pathSegments[pathSegments.length - 1];
      return fileName;
    } else return file;
  }
}
