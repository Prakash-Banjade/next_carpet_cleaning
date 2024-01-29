import { FileSystemStoredFile, IsFile } from 'nestjs-form-data';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    coverImage?: FileSystemStoredFile | string
}
