import {
    Controller,
    Get,
    Post,
    Body,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MemoryStoredFile, FormDataRequest } from 'nestjs-form-data';
import { ContactPageDto } from './dto/contact-page.dto';
import { ContactPageService } from './contact-page.service';
import { Public } from '../decorators/setPublicRoute.decorator';
import { BannerImageDto } from 'src/utils/banner-image.dto';

@ApiBearerAuth()
@ApiTags('contact-page')
@Controller('contact-page')
export class ContactPageController {
    constructor(private readonly contactPageService: ContactPageService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @FormDataRequest({ storage: MemoryStoredFile })
    @ApiConsumes('multipart/form-data')
    set(@Body() contactPageDto: ContactPageDto) {
        return this.contactPageService.setPageData(contactPageDto)
    }

    @Public()
    @Get()
    findAll() {
        console.log('contact_page findAll')
        return this.contactPageService.getPageData();
    }

    @Post('banner')
    @FormDataRequest({ storage: MemoryStoredFile })
    @ApiConsumes('multipart/form-data')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    setBanner(@Body() bannerImageDto: BannerImageDto) {
        return this.contactPageService.setBannerImage(bannerImageDto)
    }
}
