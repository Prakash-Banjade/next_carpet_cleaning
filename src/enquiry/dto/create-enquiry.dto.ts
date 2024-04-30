import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateEnquiryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('AU', {
    message: 'Enter valid phone number',
  })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString({ message: 'Email must be string' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'Address must be string' })
  address: string;

  @IsOptional()
  @IsString()
  message?: string;
}
