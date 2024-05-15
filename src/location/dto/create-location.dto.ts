import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
}
