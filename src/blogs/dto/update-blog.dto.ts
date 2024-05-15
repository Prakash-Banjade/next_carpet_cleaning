import { FileSystemStoredFile } from 'nestjs-form-data';
import { IsOptional, } from 'class-validator';
import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(OmitType(CreateBlogDto, ['coverImage'] as const)) {

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    coverImage?: FileSystemStoredFile | string

}
