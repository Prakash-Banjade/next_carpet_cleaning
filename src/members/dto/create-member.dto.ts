import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    post: string;


    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], { message: 'Invalid type for image. Image must be jpeg or png or webp' })
    @IsFile({ message: 'Invalid type for Image. Image must be file type' })
    image?: string | FileSystemStoredFile;

    @IsString()
    @IsUrl()
    @IsOptional()
    facebook?: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    instagram?: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    twitter?: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    linkedIn?: string;

    @IsString()
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;
}

