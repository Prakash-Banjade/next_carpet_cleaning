import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MemoryStoredFile } from "nestjs-form-data";

export class ServicePageDto {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    bannerImage: MemoryStoredFile | string;
}