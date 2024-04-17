import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateContactDto {
    @IsOptional()
    @IsPhoneNumber('AU', { each: true })
    phone?: string[];

    @IsOptional()
    @IsEmail()
    @IsString({ message: 'Email must be string' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Address must be string' })
    address?: string;

    @IsOptional()
    @IsUrl()
    @IsString({ message: 'Website URL must be string' })
    website?: string;

    @IsOptional()
    @IsUrl()
    @IsString({ message: 'Facebook URL must be string' })
    facebook?: string;

    @IsOptional()
    @IsUrl()
    @IsString({ message: 'Instagram URL must be string' })
    instagram?: string;

    @IsOptional()
    @IsUrl()
    @IsString({ message: 'LinkedIn URL must be string' })
    linkedIn?: string;

    @IsOptional()
    @IsUrl()
    @IsString({ message: 'Twitter URL must be string' })
    twitter?: string;
}
