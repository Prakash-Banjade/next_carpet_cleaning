import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { IsOptional } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateMemberDto extends OmitType(CreateMemberDto, ['image']) {
    @IsOptional()
    image?: string | FileSystemStoredFile;
}
