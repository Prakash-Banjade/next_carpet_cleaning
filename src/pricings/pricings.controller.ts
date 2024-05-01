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
import { PricingsService } from './pricings.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { Public } from '../decorators/setPublicRoute.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('pricings')
@Controller('pricings')
export class PricingsController {
  constructor(private readonly pricingsService: PricingsService) {}

  @Post()
  create(@Body() createPricingDto: CreatePricingDto) {
    return this.pricingsService.create(createPricingDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.pricingsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePricingDto: UpdatePricingDto) {
    return this.pricingsService.update(id, updatePricingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricingsService.remove(id);
  }
}
