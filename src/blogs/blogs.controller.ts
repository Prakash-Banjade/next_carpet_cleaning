import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MemoryStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Public } from '../decorators/setPublicRoute.decorator';

@ApiBearerAuth()
@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @FormDataRequest({ storage: MemoryStoredFile })
  @ApiConsumes('multipart/form-data')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  @Public()
  findAll(@Query('deleted') deleted: boolean) {
    return this.blogsService.findAll(deleted);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @FormDataRequest({ storage: MemoryStoredFile })
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Patch(':id/restore')
  @ApiConsumes('multipart/form-data')
  restore(@Param('id') id: string) {
    return this.blogsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }

  @Delete(':id/permanent')
  removeForever(@Param('id') id: string) {
    return this.blogsService.deletePermanent(id);
  }
}
