import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class ServicePageDto {

    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    bannerImage: FileSystemStoredFile | string;
}