import { IsNotEmpty, IsString } from "class-validator";

export class PricingOfferDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}