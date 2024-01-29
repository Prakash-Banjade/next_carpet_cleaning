import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;
    
    @IsOptional()
    coverImage?: FileSystemStoredFile | string
}
