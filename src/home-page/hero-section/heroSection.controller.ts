import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { HeroSectionDto } from '../dto/heroSection.dto';
import { HeroSectionService } from './heroSection.service';
import { Public } from 'src/decorators/setPublicRoute.decorator';

@Controller('hero-section')
export class HeroSectionController {
  constructor(private readonly heroService: HeroSectionService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @FormDataRequest({ storage: FileSystemStoredFile })
  create(@Body() createAboutDto: HeroSectionDto) {
    return this.heroService.setData(createAboutDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.heroService.getData();
  }
}
