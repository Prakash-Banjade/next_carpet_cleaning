import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { MemoryStoredFile } from 'nestjs-form-data';
import { IsOptional } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateMemberDto extends PartialType(OmitType(CreateMemberDto, ['image'])) {
    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    image?: string | MemoryStoredFile;
}
