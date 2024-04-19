import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { PricingOfferDto } from '../dto/pricingOffer.dto';
import { Public } from '../../decorators/setPublicRoute.decorator';
import { PricingOfferService } from './pricing-offer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('home/pricing-offer')
@Controller('pricing-offer')
export class PricingOfferController {
    constructor(private readonly pricingOfferService: PricingOfferService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @FormDataRequest({ storage: FileSystemStoredFile })
    create(@Body() pricingOfferDto: PricingOfferDto) {
        return this.pricingOfferService.setData(pricingOfferDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.pricingOfferService.getData();
    }
}
