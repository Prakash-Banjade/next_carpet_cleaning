import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class CreateGalleryDto {
    @ApiProperty()
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsNotEmpty({ message: "Title can't be empty" })
    title: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true })
    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], { message: 'Invalid type for images. Images must be jpeg or png or webp', each: true })
    @IsFile({ message: 'Invalid type for Images. Images must be file type', each: true })
    images: FileSystemStoredFile[] | string[]
}
