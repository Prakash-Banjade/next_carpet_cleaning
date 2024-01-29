import { FileSystemStoredFile } from 'nestjs-form-data';
import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
    @IsString({ message: 'Invalid type for title. Title must be a string' })
    @IsOptional()
    title?: string;

    @IsString({ message: 'Invalid type for content. Content must be a string' })
    @IsOptional()
    content?: string;
    
    @IsOptional()
    coverImage?: FileSystemStoredFile | string
}
