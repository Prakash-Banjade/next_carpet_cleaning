import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { HasMimeType, IsFile, FileSystemStoredFile } from 'nestjs-form-data';

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], {
    message: 'Invalid type for images. Image must be jpeg or png or webp',
  })
  @IsFile({ message: 'Invalid type for Image. Image must be file type' })
  image?: FileSystemStoredFile;

  @ApiProperty()
  @IsString({ message: 'Message must be a string' })
  @Length(10, 500, { message: 'Message must be between 10 and 500 characters' })
  message?: string;
}
