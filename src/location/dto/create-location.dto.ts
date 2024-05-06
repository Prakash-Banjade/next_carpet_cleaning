import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
}
