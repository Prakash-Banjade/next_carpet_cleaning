import { IsOptional } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class BlogPageDto{
    @IsOptional()
    bannerImage: FileSystemStoredFile | string
}