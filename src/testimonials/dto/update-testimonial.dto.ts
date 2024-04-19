import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTestimonialDto } from './create-testimonial.dto';
import { IsOptional } from 'class-validator';

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {
    @ApiPropertyOptional()
    @IsOptional()
    message?: string;
}
