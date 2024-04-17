import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { SiteSettingsDto } from './dto/site-settings.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/setPublicRoute.decorator';

@ApiTags('siteSettings')
@Controller('siteSettings')
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @FormDataRequest({ storage: FileSystemStoredFile })
  setSettings(@Body() siteSettingsDto: SiteSettingsDto) {
    return this.siteSettingsService.set(siteSettingsDto);
  }

  @Public()
  @Get()
  getSettings() {
    return this.siteSettingsService.get();
  }
}
