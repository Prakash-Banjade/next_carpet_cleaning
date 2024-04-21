import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { MemoryStoredFile } from "nestjs-form-data"

export class TopQualityDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    image: string | MemoryStoredFile
}