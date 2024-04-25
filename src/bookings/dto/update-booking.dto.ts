import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../entities/booking.entity';
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateBookingDto {
    @ApiPropertyOptional({ type: 'enum', enum: Status, description: 'status of booking' })
    @IsEnum(Status, { message: 'status must be pending, successed or rejected' })
    status?: Status

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional()
    @IsPhoneNumber('AU', { message: 'Invalid phone number. Must be Australian.' })
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    location?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    service?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    message?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    time?: string;
}
