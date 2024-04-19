import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TopQualityService } from './topQuality.service';
import { TopQualityDto } from '../dto/topQuality.dto';
import { Public } from '../../decorators/setPublicRoute.decorator';

@ApiBearerAuth()
@ApiTags('topQuality')
@Controller('topQuality')
export class TopQualityController {
    constructor(private readonly topQualityService: TopQualityService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @FormDataRequest({ storage: FileSystemStoredFile })
    @ApiConsumes('multipart/form-data')
    setSettings(@Body() topQualityDto: TopQualityDto) {
        return this.topQualityService.set(topQualityDto);
    }

    @Public()
    @Get()
    getSettings() {
        return this.topQualityService.get();
    }
}
