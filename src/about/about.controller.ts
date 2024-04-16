import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('about-page')
export class AboutController {
  constructor(private readonly aboutService: AboutService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @FormDataRequest({ storage: FileSystemStoredFile })
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.aboutService.setData(createAboutDto);
  }

  @Post('banner')
  @FormDataRequest({ storage: FileSystemStoredFile })
  setBanner(@Body() banner: FileSystemStoredFile) {
    return this.aboutService.setBannerImage(banner)
  }

  @Get()
  findAll() {
    return this.aboutService.getData();
  }
}
