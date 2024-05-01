import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from '../../decorators/setPublicRoute.decorator';
import { CurrentOfferService } from './currentOffer.service';
import { CreateCurrentOfferDto } from '../dto/create-currentOffer.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { UpdateCurrentOfferDto } from '../dto/update-currentOffer.dto';

@ApiBearerAuth()
@ApiTags('current-offers')
@Controller('current-offers')
export class CurrentOfferController {
  constructor(private readonly currentOfferService: CurrentOfferService) {}

  @Post()
  @FormDataRequest({ storage: MemoryStoredFile })
  @ApiConsumes('multipart/form-data')
  create(@Body() createCurrentOfferDto: CreateCurrentOfferDto) {
    return this.currentOfferService.create(createCurrentOfferDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.currentOfferService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currentOfferService.findOne(id);
  }

  @Patch(':id')
  @FormDataRequest({ storage: MemoryStoredFile })
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Body() updateCurrentOfferDto: UpdateCurrentOfferDto,
  ) {
    return this.currentOfferService.update(id, updateCurrentOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currentOfferService.remove(id);
  }
}
