import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomePageService } from './home-page.service';

@Controller('home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) { }

  @Post()
  create() {
    return this.homePageService.create();
  }

  @Get()
  findAll() {
    return this.homePageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homePageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.homePageService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homePageService.remove(+id);
  }
}
