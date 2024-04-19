import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';

export class UpdateGalleryDto {
    @ApiPropertyOptional()
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true })
    @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], { message: 'Invalid type for images. Images must be jpeg or png or webp', each: true })
    @IsFile({ message: 'Invalid type for images. Images must be file type', each: true })
    @IsOptional()
    images?: FileSystemStoredFile[]

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true })
    @IsOptional()
    @IsString({ message: 'Invalid type for previousImages. previousImages must be a string', each: true })
    previousImages?: string[] | string
}
