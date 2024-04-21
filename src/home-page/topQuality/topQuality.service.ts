import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { TopQuality } from '../entities/topQuality.entity';
import { TopQualityDto } from '../dto/topQuality.dto';
import getImageUrl from '../../utils/getImageUrl';

@Injectable()
export class TopQualityService {

  constructor(
    @InjectRepository(TopQuality) private readonly topQualityRepo: Repository<TopQuality>,
  ) { }

  async set(topQualityDto: TopQualityDto) {
    // const image = topQualityDto.image && this.getFileName(topQualityDto.image);
    const image = await getImageUrl(topQualityDto.image);

    const existingSettings = await this.topQualityRepo.find();

    if (!existingSettings.length) { // create new
      const newSettings = await this.topQualityRepo.save({
        ...topQualityDto,
        image,
      })

      return newSettings;
    }

    // update existing
    Object.assign(existingSettings[0], {
      ...topQualityDto,
      image
    })

    return await this.topQualityRepo.save(existingSettings[0]);
  }

  async get() {
    const existingSettings = await this.topQualityRepo.find();
    return existingSettings.length > 0 ? existingSettings[0] : null;
  }

  public getFileName(file: FileSystemStoredFile | string) {
    if (typeof file !== 'string') {
      const pathSegments = file?.path.split('\\');
      const fileName = pathSegments[pathSegments.length - 1];
      return fileName;
    } else return file;
  }
}
