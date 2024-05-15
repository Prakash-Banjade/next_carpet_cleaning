import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/setPublicRoute.decorator';

@ApiBearerAuth()
@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Get()
  fetch() {
    return this.contactService.fetch();
  }

  @Post()
  
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  // @Patch()
  // 
  // update(@Body() updateContactDto: UpdateContactDto) {
  //   return this.contactService.update(updateContactDto);
  // }

  @Patch()
  @UsePipes()
  update(@Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(updateContactDto);
  }
}
