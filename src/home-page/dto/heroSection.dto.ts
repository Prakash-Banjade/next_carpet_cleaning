import { IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class HeroSectionDto {
    @IsString()
    title: string;

    @IsString()
    subtitle: string;

    @IsString()
    description: string;

    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png','image/webp'], { message: 'Invalid type for image. Image must be a jpeg or png' })
    @IsFile({ message: 'Invalid type for image. Image must be a file' })
    image: FileSystemStoredFile | string
    
}