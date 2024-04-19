import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateContactDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsPhoneNumber('AU', { each: true })
    phone?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    @IsString({ message: 'Email must be string' })
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: 'Address must be string' })
    address?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @IsString({ message: 'Website URL must be string' })
    website?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @IsString({ message: 'Facebook URL must be string' })
    facebook?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @IsString({ message: 'Instagram URL must be string' })
    instagram?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @IsString({ message: 'LinkedIn URL must be string' })
    linkedIn?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @IsString({ message: 'Twitter URL must be string' })
    twitter?: string;
}
