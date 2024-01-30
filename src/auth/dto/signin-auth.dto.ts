import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInAuthDto {
    @IsString({ message: 'email must be string' })
    @IsNotEmpty({ message: 'Email Field is required' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Password field is required' })
    @IsString({ message: 'Password must be string' })
    password: string;
}
