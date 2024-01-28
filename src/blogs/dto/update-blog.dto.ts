import { FileSystemStoredFile, IsFile } from 'nestjs-form-data';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    content?: string;

    @IsOptional()
    coverImage?: FileSystemStoredFile | string
}
