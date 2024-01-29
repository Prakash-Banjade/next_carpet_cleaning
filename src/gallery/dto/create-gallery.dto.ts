import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class CreateGalleryDto {
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsNotEmpty({ message: "Title can't be empty" })
    title: string;

    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png'], { message: 'Invalid type for images. Images must be jpeg or png' })
    @IsFile({ message: 'Invalid type for Images. Images must be file type' })
    images: FileSystemStoredFile[] | string[]
}
