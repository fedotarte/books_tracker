import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Logger,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBookDto } from './dto/create-book.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssignBookDto } from './dto/assign-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { RequestWithUser } from '../auth/request-with-user.interface';

@ApiTags('books')
@Controller({
  path: 'books',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class BooksController {
  private readonly logger = new Logger(BooksController.name);
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.CREATED)
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Post('user')
  @ApiOperation({ summary: 'assign a book to user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The book has been successfully assigned.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.ACCEPTED)
  addBookToUser(@Req() req: RequestWithUser, @Body() data: AssignBookDto) {
    const userId = req.user.id;
    return this.booksService.addBookToUser(userId, data.bookId, data);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all books',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'limit', type: 'number', example: 30 })
  @ApiQuery({ name: 'offset', type: 'number', example: 0 })
  async findAllBooks(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    this.logger.log('getting all books request');
    return this.booksService.findAllBooks({ limit, offset });
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get assigned books for user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Books for user',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.OK)
  findAllBooksForUser(@Req() req: RequestWithUser) {
    this.logger.log(`getting all books for user, request: ${req}`);
    const userId = req.user.id;
    return this.booksService.findAllBooksForUser(userId);
  }

  @Delete('user/:bookId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'archive book' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Book archived',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeBookFromUser(
    @Req() req: RequestWithUser,
    @Param('bookId') bookId: string,
  ) {
    const userId = req.user.id;
    return this.booksService.removeBookFromUser(userId, +bookId);
  }

  @Patch('user/:bookId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update book' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Book updated',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @HttpCode(HttpStatus.ACCEPTED)
  updateUserBook(
    @Req() req: RequestWithUser,
    @Param('bookId') bookId: string,
    @Body() data: UpdateBookDto,
  ) {
    const userId = req.user.id;
    return this.booksService.updateBook(userId, +bookId, data);
  }
}
