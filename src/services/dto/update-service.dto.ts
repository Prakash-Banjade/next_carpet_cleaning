import { FileSystemStoredFile } from 'nestjs-form-data';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateServiceDto {
    @ApiPropertyOptional()
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsOptional()
    title?: string;

    @ApiPropertyOptional()
    @IsString({ message: 'Invalid type for content. Content must be a string' })
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    coverImage?: FileSystemStoredFile | string
}
