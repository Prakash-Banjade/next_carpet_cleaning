import { Controller, Get, Post, Body, Patch, Param, ValidationPipe, UsePipes } from '@nestjs/common';
import { } from './dto/create-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { ServicePage_Service } from './service-page.service';
import { ServicePageDto } from './dto/service-page.dto';
import { Public } from 'src/decorators/setPublicRoute.decorator';


@ApiTags('service-page')

@Controller('service-page')
export class ServicePageController {
    constructor(private readonly servicePage_service: ServicePage_Service) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @FormDataRequest({ storage: FileSystemStoredFile })
    setData(@Body() servicePageDto: ServicePageDto) {
        return this.servicePage_service.setPageData(servicePageDto);
    }

    @Post('banner')
    @FormDataRequest({ storage: FileSystemStoredFile })
    setBanner(@Body() bannerImage: { bannerImage: FileSystemStoredFile }) {
        return this.servicePage_service.setBannerImage(bannerImage.bannerImage)
    }


    @Public()
    @Get()
    getData() {
        return this.servicePage_service.getPageData();
    }
}
