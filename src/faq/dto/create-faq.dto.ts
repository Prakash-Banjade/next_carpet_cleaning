import { IsNotEmpty, IsString } from "class-validator";

export class CreateFaqDto {
    @IsString()
    @IsNotEmpty({ message: 'Question is required. Question cannot be empty.' })
    question: string;

    @IsString()
    @IsNotEmpty({ message: 'Answer is required. Answer cannot be empty.' })
    answer: string;
}
