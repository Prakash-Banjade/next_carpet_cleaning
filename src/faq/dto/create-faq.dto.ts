import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFaqDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty({ message: 'Question is required. Question cannot be empty.' })
    question: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Answer is required. Answer cannot be empty.' })
    answer: string;
}
