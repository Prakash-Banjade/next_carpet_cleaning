import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'Name must be string' })
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Password must be string' })
    @Length(8)
    password: string;
}
