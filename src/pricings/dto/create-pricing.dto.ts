import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePricingDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsEnum(['month', 'year'])
    @IsNotEmpty()
    per: ['month', 'year']

    @IsString({ each: true })
    @IsNotEmpty()
    description: string[];
}
