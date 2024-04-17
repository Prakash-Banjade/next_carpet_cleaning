import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class ServicePageDto {

    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;


    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], { message: 'Invalid type for banner image. Banner image must be a jpeg or png' })
    @IsFile({ message: 'Invalid type for banner image. Banner image must be a file' })
    bannerImage: FileSystemStoredFile | string;
}