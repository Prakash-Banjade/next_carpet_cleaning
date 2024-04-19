import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class SiteSettingsDto {
    @ApiProperty()
    @IsString({ message: "Title must be a string" })
    @IsString({ message: "Title is required" })
    title: string;

    @ApiProperty()
    @IsString({ message: "Tagline must be a string" })
    @IsNotEmpty({ message: "Tagline is required" })
    tagline: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    primaryImage: FileSystemStoredFile | string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    secondaryImage: FileSystemStoredFile | string;
}
