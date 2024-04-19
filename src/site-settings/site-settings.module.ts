import { Module } from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';
import { SiteSettingsController } from './site-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSettings } from './entities/site-setting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SiteSettings
    ])
  ],
  controllers: [SiteSettingsController],
  providers: [SiteSettingsService],
})
export class SiteSettingsModule { }
