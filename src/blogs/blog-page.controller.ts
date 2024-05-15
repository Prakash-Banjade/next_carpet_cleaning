import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { BlogPageDto } from './dto/blog-page.dto';
import { BlogPageService } from './blog-page.service';
import { Public } from '../decorators/setPublicRoute.decorator';

@ApiBearerAuth()
@ApiTags('blog-page')
@Controller('blog-page')
export class BlogPageController {
  constructor(private readonly blogPageService: BlogPageService) {}

  @Post()
  @FormDataRequest({ storage: FileSystemStoredFile })
  @ApiConsumes('multipart/form-data')
  set(@Body() blogPageDto: BlogPageDto) {
    return this.blogPageService.setPageData(blogPageDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.blogPageService.getPageData();
  }
}
