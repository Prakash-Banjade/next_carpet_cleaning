import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePrivacyPolicyDto {
    @ApiProperty()
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @ApiProperty()
    @IsString({ message: 'Content must be a string' })
    @IsNotEmpty({ message: 'Content is required' })
    content: string;
}
