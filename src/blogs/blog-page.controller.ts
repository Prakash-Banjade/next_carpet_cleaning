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
import { BlogPageDto } from './dto/blog-page.dto';
import { BlogPageService } from './blog-page.service';
import { Public } from '../decorators/setPublicRoute.decorator';

@ApiTags('blog-page')
@Controller('blog-page')
export class BlogPageController {
    constructor(private readonly blogPageService: BlogPageService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @FormDataRequest({ storage: FileSystemStoredFile })
    set(@Body() blogPageDto: BlogPageDto) {
        return this.blogPageService.setPageData(blogPageDto)
    }

    @Public()
    @Get()
    findAll() {
        console.log('blog_page findAll')
        return this.blogPageService.getPageData();
    }


}
