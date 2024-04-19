import {
    Controller,
    Get,
    Post,
    Body,
    ValidationPipe,
    UsePipes,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { GalleryPageDto } from './dto/gallery-page.dto';
import { GalleryPageService } from './gallery-page.service';
import { Public } from '../decorators/setPublicRoute.decorator';

@ApiBearerAuth()
@ApiTags('gallery-page')
@Controller('gallery-page')
export class GalleryPageController {
    constructor(private readonly galleryPageService: GalleryPageService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @ApiConsumes('multipart/form-data')
    @FormDataRequest({ storage: FileSystemStoredFile })
    set(@Body() galleryPageDto: GalleryPageDto) {
        return this.galleryPageService.setPageData(galleryPageDto)
    }

    @Public()
    @Get()
    findAll() {
        console.log('gallery_page findAll')
        return this.galleryPageService.getPageData();
    }

    @Post('banner')
    @FormDataRequest({ storage: FileSystemStoredFile })
    @ApiConsumes('multipart/form-data')
    setBanner(@Body() bannerImage: { bannerImage: FileSystemStoredFile }) {
        return this.galleryPageService.setBannerImage(bannerImage.bannerImage)
    }
}
