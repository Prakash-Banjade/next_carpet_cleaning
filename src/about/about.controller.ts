import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Public } from '../decorators/setPublicRoute.decorator';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { BannerImageDto } from '../utils/banner-image.dto';

@ApiBearerAuth()
@ApiTags('about-page')
@Controller('about-page')
export class AboutController {
  constructor(private readonly aboutService: AboutService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @FormDataRequest({ storage: FileSystemStoredFile })
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.aboutService.setData(createAboutDto);
  }

  @Post('banner')
  @ApiConsumes('multipart/form-data')
  @FormDataRequest({ storage: FileSystemStoredFile })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  setBanner(@Body() bannerImageDto: BannerImageDto) {
    return this.aboutService.setBannerImage(bannerImageDto)
  }

  @Public()
  @Get()
  findAll() {
    return this.aboutService.getData();
  }
}
