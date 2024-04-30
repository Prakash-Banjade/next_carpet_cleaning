import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateEnquiryDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsPhoneNumber('AU')
  phone: string[];

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEmail()
  @IsString({ message: 'Email must be string' })
  email: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString({ message: 'Address must be string' })
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}
