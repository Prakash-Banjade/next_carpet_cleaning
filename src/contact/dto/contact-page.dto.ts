import { IsOptional } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class ContactPageDto{
    @IsOptional()
    bannerImage: FileSystemStoredFile | string
}