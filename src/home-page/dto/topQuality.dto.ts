import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { FileSystemStoredFile } from "nestjs-form-data"

export class TopQualityDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsOptional()
    image: string | FileSystemStoredFile
}