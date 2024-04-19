import {
    Controller,
    Get,
    Post,
    Body,
    ValidationPipe,
    UsePipes,
    Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { GalleryPageService } from 'src/gallery/gallery-page.service';
import { ContactPageDto } from './dto/contact-page.dto';
import { ContactPageService } from './contact-page.service';
import { Public } from 'src/decorators/setPublicRoute.decorator';

@ApiTags('contact-page')
@Controller('contact-page')
export class ContactPageController {
    constructor(private readonly contactPageService: ContactPageService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @FormDataRequest({ storage: FileSystemStoredFile })
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
    @FormDataRequest({ storage: FileSystemStoredFile })
    setBanner(@Body() bannerImage: { bannerImage: FileSystemStoredFile }) {
        return this.contactPageService.setBannerImage(bannerImage.bannerImage)
    }
}
