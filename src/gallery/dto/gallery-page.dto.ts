import { IsOptional } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class GalleryPageDto{
    @IsOptional()
    bannerImage: FileSystemStoredFile | string
}