import {
    Controller,
    Get,
    Post,
    Body,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { ContactPageDto } from './dto/contact-page.dto';
import { ContactPageService } from './contact-page.service';
import { Public } from '../decorators/setPublicRoute.decorator';
import { BannerImageDto } from '../utils/banner-image.dto';

@ApiBearerAuth()
@ApiTags('contact-page')
@Controller('contact-page')
export class ContactPageController {
    constructor(private readonly contactPageService: ContactPageService) { }

    @Post()
    
    @FormDataRequest({ storage: FileSystemStoredFile })
    @ApiConsumes('multipart/form-data')
    set(@Body() contactPageDto: ContactPageDto) {
        return this.contactPageService.setPageData(contactPageDto)
    }

    @Public()
    @Get()
    findAll() {
        return this.contactPageService.getPageData();
    }

    @Post('banner')
    @FormDataRequest({ storage: FileSystemStoredFile })
    @ApiConsumes('multipart/form-data')
    
    setBanner(@Body() bannerImageDto: BannerImageDto) {
        return this.contactPageService.setBannerImage(bannerImageDto)
    }
}
