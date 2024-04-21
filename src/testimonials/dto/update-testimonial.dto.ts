import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateTestimonialDto } from './create-testimonial.dto';
import { IsOptional } from 'class-validator';
import { MemoryStoredFile } from 'nestjs-form-data';

export class UpdateTestimonialDto extends PartialType(OmitType(CreateTestimonialDto, ['image'] as const)) {
    @IsOptional()
    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    image?: MemoryStoredFile | string;
}
