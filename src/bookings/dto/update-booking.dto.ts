import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateBookingDto extends PartialType(OmitType(CreateBookingDto, ['name', 'phone'])) {}
