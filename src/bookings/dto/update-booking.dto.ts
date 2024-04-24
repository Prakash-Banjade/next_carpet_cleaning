import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { OmitType } from '@nestjs/mapped-types';
import { Status } from '../entities/booking.entity';
import { IsEnum } from 'class-validator';

export class UpdateBookingDto extends PartialType(OmitType(CreateBookingDto, ['name', 'phone'])) {
    @ApiPropertyOptional({ type: 'enum', enum: Status, description: 'status of booking' })
    @IsEnum(Status, { message: 'status must be pending, successed or rejected' })
    status: Status
}
