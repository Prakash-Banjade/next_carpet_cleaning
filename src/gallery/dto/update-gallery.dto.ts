import { IsOptional, IsString } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';

export class UpdateGalleryDto {
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsOptional()
    title?: string;

    @HasMimeType(['image/jpeg', 'image/png'], { message: 'Invalid type for images. Images must be jpeg or png' })
    @IsFile({ message: 'Invalid type for images. Images must be file type' })
    @IsOptional()
    images?: FileSystemStoredFile[] | string[]
}
