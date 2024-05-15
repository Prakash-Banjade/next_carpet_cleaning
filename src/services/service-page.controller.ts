import { Controller, Get, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { } from './dto/create-service.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { ServicePage_Service } from './service-page.service';
import { ServicePageDto } from './dto/service-page.dto';
import { Public } from '../decorators/setPublicRoute.decorator';
import { BannerImageDto } from '../utils/banner-image.dto';


@ApiBearerAuth()
@ApiTags('service-page')
@Controller('service-page')
export class ServicePageController {
    constructor(private readonly servicePage_service: ServicePage_Service) { }

    @Post()
    
    @FormDataRequest({ storage: FileSystemStoredFile })
    @ApiConsumes('multipart/form-data')
    setData(@Body() servicePageDto: ServicePageDto) {
        return this.servicePage_service.setPageData(servicePageDto);
    }

    @Post('banner')
    @FormDataRequest({ storage: FileSystemStoredFile })
    @ApiConsumes('multipart/form-data')
    
    setBanner(@Body() bannerImageDto: BannerImageDto) {
        return this.servicePage_service.setBannerImage(bannerImageDto)
    }


    @Public()
    @Get()
    getData() {
        return this.servicePage_service.getPageData();
    }
}
