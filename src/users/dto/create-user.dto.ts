import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString({ message: 'Name must be string' })
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty()
    @IsString({ message: 'Password must be string' })
    @Length(8)
    password: string;

    @ApiProperty()
    @IsPhoneNumber('AU', {message: 'Invalid phone number. Must be an Australian phone number'})
    phone: string;
}
