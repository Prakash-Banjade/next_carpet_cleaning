import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePricingDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ enum: ['month', 'year'] })
    @IsEnum(['month', 'year'], { message: 'Per must be month or year' })
    @IsNotEmpty()
    per: ['month', 'year']

    @ApiProperty()
    @IsString({ each: true })
    @IsNotEmpty()
    description: string[];
}
