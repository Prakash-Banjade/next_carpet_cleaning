import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MemoryStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class CreateServiceDto {
    @ApiProperty()
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsNotEmpty({ message: "Title can't be empty" })
    title: string;

    @ApiProperty()
    @IsString({ message: 'Invalid type for content. Content must be a string' })
    @IsNotEmpty({ message: "Content can't be empty" })
    content: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], { message: 'Invalid type for cover image. Cover image must be a jpeg or png' })
    @IsFile({ message: 'Invalid type for cover image. Cover image must be a file' })
    coverImage: MemoryStoredFile;
}
