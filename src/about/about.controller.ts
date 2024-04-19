import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Public } from '../decorators/setPublicRoute.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('about-page')
@Controller('about-page')
export class AboutController {
  constructor(private readonly aboutService: AboutService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @FormDataRequest({ storage: FileSystemStoredFile })
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.aboutService.setData(createAboutDto);
  }

  @Post('banner')
  @FormDataRequest({ storage: FileSystemStoredFile })
  setBanner(@Body() bannerImage: { bannerImage: FileSystemStoredFile }) {
    return this.aboutService.setBannerImage(bannerImage.bannerImage)
  }

  @Public()
  @Get()
  findAll() {
    return this.aboutService.getData();
  }
}
