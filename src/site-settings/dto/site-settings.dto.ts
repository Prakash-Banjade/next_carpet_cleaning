import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class SiteSettingsDto {
    @IsString({ message: "Title must be a string" })
    @IsString({ message: "Title is required" })
    title: string;

    @IsString({ message: "Tagline must be a string" })
    @IsNotEmpty({ message: "Tagline is required" })
    tagline: string;

    @IsOptional()
    primaryImage: FileSystemStoredFile | string;

    @IsOptional()
    secondaryImage: FileSystemStoredFile | string;
}
