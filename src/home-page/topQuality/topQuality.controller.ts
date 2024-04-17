import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { ApiTags } from '@nestjs/swagger';
import { TopQualityService } from './topQuality.service';
import { TopQualityDto } from '../dto/topQuality.dto';
import { Public } from 'src/decorators/setPublicRoute.decorator';

@ApiTags('topQuality')
@Controller('topQuality')
export class TopQualityController {
    constructor(private readonly topQualityService: TopQualityService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @FormDataRequest({ storage: FileSystemStoredFile })
    setSettings(@Body() topQualityDto: TopQualityDto) {
        return this.topQualityService.set(topQualityDto);
    }

    @Public()
    @Get()
    getSettings() {
        return this.topQualityService.get();
    }
}
