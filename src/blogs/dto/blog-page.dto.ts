import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class BlogPageDto {
    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    bannerImage: FileSystemStoredFile | string
}