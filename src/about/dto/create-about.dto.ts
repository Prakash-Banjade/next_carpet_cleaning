import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class CreateAboutDto {
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsString({ message: 'Content must be a string' })
    content: string;

    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png','image/webp'], { message: 'Invalid type for cover image. Cover image must be a jpeg or png' })
    @IsFile({ message: 'Invalid type for cover image. Cover image must be a file' })
    coverImage: FileSystemStoredFile | string;

    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png','image/webp'], { message: 'Invalid type for banner image. Banner image must be a jpeg or png' })
    @IsFile({ message: 'Invalid type for banner image. Banner image must be a file' })
    bannerImage: FileSystemStoredFile | string;
}
