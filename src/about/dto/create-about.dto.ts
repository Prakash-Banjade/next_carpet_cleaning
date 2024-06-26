import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class CreateAboutDto {
    @ApiProperty()
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @ApiProperty()
    @IsString({ message: 'Content must be a string' })
    content: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    coverImage?: FileSystemStoredFile | string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    bannerImage?: FileSystemStoredFile | string;
}
