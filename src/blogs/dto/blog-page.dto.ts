import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class BlogPageDto{
    @ApiPropertyOptional()
    @IsOptional()
    bannerImage: FileSystemStoredFile | string
}