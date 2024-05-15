import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class UpdateMemberDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    post?: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    image?: string | FileSystemStoredFile;

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
    phone: string;
}
