import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { IsOptional } from 'class-validator';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
    @IsOptional()
    image?: string | FileSystemStoredFile;
}
