import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorDto } from './dto/author.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('authors')
@Controller({
  path: 'authors',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Author has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All authors',
    type: Array<AuthorDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.authorsService.findAll();
  }
}
