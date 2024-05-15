import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { HeroSectionDto } from '../dto/heroSection.dto';
import { HeroSectionService } from './heroSection.service';
import { Public } from '../../decorators/setPublicRoute.decorator';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('home/hero-section')
@Controller('hero-section')
export class HeroSectionController {
  constructor(private readonly heroService: HeroSectionService) { }

  @Post()
  
  @FormDataRequest({ storage: FileSystemStoredFile })
  @ApiConsumes('multipart/form-data')
  create(@Body() createAboutDto: HeroSectionDto) {
    return this.heroService.setData(createAboutDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.heroService.getData();
  }
}
