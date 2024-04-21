import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MemoryStoredFile } from "nestjs-form-data";

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
    primaryImage: MemoryStoredFile | string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    secondaryImage: MemoryStoredFile | string;
}
