import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileSystemStoredFile } from 'nestjs-form-data';

export class UpdateAboutDto {
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title?: string;

    @IsString({ message: 'Content must be a string' })
    content?: string;

    @IsOptional()
    coverImage?: FileSystemStoredFile | string;

    @IsOptional()
    bannerImage?: FileSystemStoredFile | string;
}
