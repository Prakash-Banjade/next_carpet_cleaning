import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { HasMimeType, IsFile, FileSystemStoredFile } from 'nestjs-form-data';

export class CreateGalleryDto {
  @ApiProperty()
  @IsString({ message: 'Invalid type for title. Title must be a string' })
  @IsNotEmpty({ message: "Title can't be empty" })
  title: string;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  @HasMimeType(['image/jpeg', 'image/png', 'image/webp'], {
    message: 'Invalid type for images. Images must be jpeg or png or webp',
    each: true,
  })
  @IsFile({
    message: 'Invalid type for Images. Images must be file type',
    each: true,
  })
  images: FileSystemStoredFile[];

  @IsString()
  @IsOptional()
  serviceId?: string;
}
