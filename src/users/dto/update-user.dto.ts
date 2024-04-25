import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";


export class UpdateUserDto {
    @ApiPropertyOptional()
    @IsString({ message: 'Name must be string' })
    @IsOptional()
    name: string;

    @ApiPropertyOptional()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiPropertyOptional({ description: 'Australian phone number' })
    @IsPhoneNumber('AU', { message: 'Invalid phone number. Must be an Australian phone number' })
    @IsOptional()
    phone: string;
}
