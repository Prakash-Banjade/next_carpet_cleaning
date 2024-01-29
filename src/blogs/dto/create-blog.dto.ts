import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class CreateBlogDto {
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsNotEmpty({ message: "Title can't be empty" })
    title: string;

    @IsString({ message: 'Invalid type for content. Content must be a string' })
    @IsNotEmpty({ message: "Content can't be empty" })
    content: string;

    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png'], { message: 'Invalid type for cover image. Cover image must be a jpeg or png' })
    @IsFile({ message: 'Invalid type for cover image. Cover image must be a file' })
    coverImage: FileSystemStoredFile | string
}
