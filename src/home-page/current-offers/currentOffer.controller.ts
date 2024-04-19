import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from 'src/decorators/setPublicRoute.decorator';
import { CurrentOfferService } from './currentOffer.service';
import { CurrentOfferDto } from '../dto/currentOffer.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@ApiTags('current-offers')
@Controller('current-offers')
export class CurrentOfferController {
    constructor(private readonly currentOfferService: CurrentOfferService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @FormDataRequest({ storage: FileSystemStoredFile })
    create(@Body() currentOfferDto: CurrentOfferDto) {
        return this.currentOfferService.create(currentOfferDto);
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
    @FormDataRequest({ storage: FileSystemStoredFile })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    update(@Param('id') id: string, @Body() currentOfferDto: CurrentOfferDto) {
        return this.currentOfferService.update(id, currentOfferDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.currentOfferService.remove(id);
    }
}
