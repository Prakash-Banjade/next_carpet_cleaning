import { IsNotEmpty, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
