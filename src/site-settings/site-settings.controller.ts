import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';
import { MemoryStoredFile, FormDataRequest } from 'nestjs-form-data';
import { SiteSettingsDto } from './dto/site-settings.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/setPublicRoute.decorator';

@ApiBearerAuth()
@ApiTags('siteSettings')
@Controller('siteSettings')
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Post()
  @FormDataRequest({ storage: MemoryStoredFile })
  @ApiConsumes('multipart/form-data')
  setSettings(@Body() siteSettingsDto: SiteSettingsDto) {
    return this.siteSettingsService.set(siteSettingsDto);
  }

  @Public()
  @Get()
  getSettings() {
    return this.siteSettingsService.get();
  }
}
