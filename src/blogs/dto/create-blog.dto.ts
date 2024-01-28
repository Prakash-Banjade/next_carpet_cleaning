import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsFile()
    coverImage: FileSystemStoredFile | string
}
