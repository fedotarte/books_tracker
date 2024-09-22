import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ example: 123 })
  id: number;
  @ApiProperty({ example: '1984' })
  title: string;
  @ApiProperty()
  averageRating: number;
  @ApiProperty({ type: 'string', format: 'date' })
  createdAt: Date;
  @ApiProperty()
  bookAuthorId: Array<string>;
}
