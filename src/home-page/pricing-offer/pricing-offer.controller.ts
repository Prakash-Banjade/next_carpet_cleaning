import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { PricingOfferDto } from '../dto/pricingOffer.dto';
import { Public } from '../../decorators/setPublicRoute.decorator';
import { PricingOfferService } from './pricing-offer.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('home/pricing-offer')
@Controller('pricing-offer')
export class PricingOfferController {
  constructor(private readonly pricingOfferService: PricingOfferService) {}

  @Post()

  // @FormDataRequest({ storage: FileSystemStoredFile })
  @ApiConsumes('multipart/form-data')
  create(@Body() pricingOfferDto: PricingOfferDto) {
    return this.pricingOfferService.setData(pricingOfferDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.pricingOfferService.getData();
  }
}
