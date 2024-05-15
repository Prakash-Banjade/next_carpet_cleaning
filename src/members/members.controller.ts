import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Public } from '../decorators/setPublicRoute.decorator';
import { RequestUser } from 'types';
import { User } from '../decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Public()
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @FormDataRequest({ storage: FileSystemStoredFile })
  @ApiConsumes('multipart/form-data')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @FormDataRequest({ storage: FileSystemStoredFile })
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: RequestUser) {
    return this.membersService.remove(id, user);
  }
}
