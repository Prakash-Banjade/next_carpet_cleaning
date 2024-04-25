import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../entities/booking.entity';
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class UpdateBookingDto {
    @ApiPropertyOptional({ type: 'enum', enum: Status, description: 'Status of booking' })
    status?: Status

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: 'Australian phone number' })
    @IsPhoneNumber('AU', { message: 'Invalid phone number. Must be Australian.' })
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    location?: string;

    @ApiPropertyOptional({ type: 'string', format: 'uuid' })
    @IsOptional()
    @IsUUID()
    service?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    message?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    time?: string;
}
