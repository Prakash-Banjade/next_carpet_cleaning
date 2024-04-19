import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInAuthDto {
    @ApiProperty()
    @IsString({ message: 'email must be string' })
    @IsNotEmpty({ message: 'Email Field is required' })
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password field is required' })
    @IsString({ message: 'Password must be string' })
    password: string;
}
