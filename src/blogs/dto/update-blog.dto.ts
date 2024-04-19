import { FileSystemStoredFile } from 'nestjs-form-data';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBlogDto {
    @ApiPropertyOptional()
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsOptional()
    title?: string;

    @ApiPropertyOptional()
    @IsString({ message: 'Invalid type for content. Content must be a string' })
    @IsOptional()
    content?: string;

    @ApiPropertyOptional()
    @IsOptional()
    coverImage?: FileSystemStoredFile | string
}
