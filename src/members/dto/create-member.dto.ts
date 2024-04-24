import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";

export class CreateMemberDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    post: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], { message: 'Invalid type for image. Image must be jpeg or png or webp' })
    @IsFile({ message: 'Invalid type for Image. Image must be file type' })
    image?: MemoryStoredFile;

    @ApiPropertyOptional()
    @IsString()
    @IsUrl()
    @IsOptional()
    facebook?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsUrl()
    @IsOptional()
    instagram?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsUrl()
    @IsOptional()
    twitter?: string;

    @IsString()
    @ApiPropertyOptional()
    @IsUrl()
    @IsOptional()
    linkedIn?: string;

    @ApiProperty()
    @IsPhoneNumber('AU', { message: 'Invalid phone number. Must be an Australian phone number' })
    phone?: string;
}

