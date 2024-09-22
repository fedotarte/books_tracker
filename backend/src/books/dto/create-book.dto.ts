import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'The Great Gatsby' })
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ example: [1, 2], isArray: true })
  authorIds: number[];
}
