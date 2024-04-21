import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateBookingDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('AU', { message: 'Invalid phone number. Must be Australian.' })
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    service: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    time: string;
}
