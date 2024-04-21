import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}