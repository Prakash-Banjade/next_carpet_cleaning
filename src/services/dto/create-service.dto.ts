import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, IsFile } from "nestjs-form-data";

export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsFile()
    coverImage: FileSystemStoredFile | string;
}
