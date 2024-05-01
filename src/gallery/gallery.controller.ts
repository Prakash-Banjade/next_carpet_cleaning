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
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/setPublicRoute.decorator';

@ApiBearerAuth()
@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @FormDataRequest({ storage: MemoryStoredFile })
  @ApiConsumes('multipart/form-data')
  create(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleryService.create(createGalleryDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Patch(':id')
  @FormDataRequest({ storage: MemoryStoredFile })
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
