import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class CreateTestimonialDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Max(5, { message: 'Rating must be less than or equal to 5' })
    @Min(0, { message: 'Rating must be greater than or equal to 0' })
    rating: number;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], { message: 'Invalid type for images. Image must be jpeg or png or webp' })
    @IsFile({ message: 'Invalid type for Image. Image must be file type' })
    image?: string | FileSystemStoredFile;

    @IsString({ message: 'Message must be a string' })
    @Length(10, 500, { message: 'Message must be between 10 and 500 characters' })
    @IsOptional()
    message?: string;
}
