import { Injectable } from '@nestjs/common';
import { SiteSettingsDto } from './dto/site-settings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteSettings } from './entities/site-setting.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import getImageUrl from '../utils/getImageUrl';

@Injectable()
export class SiteSettingsService {

  constructor(
    @InjectRepository(SiteSettings) private readonly siteSettingsRepo: Repository<SiteSettings>,
  ) { }

  async set(siteSettingsDto: SiteSettingsDto) {
    // const primaryImage = siteSettingsDto.primaryImage && this.getFileName(siteSettingsDto.primaryImage);
    // const secondaryImage = siteSettingsDto.secondaryImage && this.getFileName(siteSettingsDto.secondaryImage);
    const primaryImage = await getImageUrl(siteSettingsDto.primaryImage)
    const secondaryImage = await getImageUrl(siteSettingsDto.secondaryImage)

    const existingSettings = await this.siteSettingsRepo.find();

    if (!existingSettings.length) { // create new settings
      const newSettings = await this.siteSettingsRepo.save({
        ...siteSettingsDto,
        primaryImage,
        secondaryImage
      })

      return newSettings;
    }

    // update existing settings
    Object.assign(existingSettings[0], {
      ...siteSettingsDto,
      primaryImage,
      secondaryImage
    })

    return await this.siteSettingsRepo.save(existingSettings[0]);
  }

  async get() {
    const existingSettings = await this.siteSettingsRepo.find();
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
