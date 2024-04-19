import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

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
}
