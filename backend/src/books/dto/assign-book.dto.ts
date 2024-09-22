import { IsOptional, IsInt, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignBookDto {
  @ApiProperty()
  @IsInt()
  bookId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  priority: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  rating: number;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;
}
