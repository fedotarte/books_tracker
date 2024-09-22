import { Injectable, Logger } from '@nestjs/common';
import { AssignBookDto } from './dto/assign-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { IGetBooksParams } from './books.types';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(private prismaService: PrismaService) {}

  async createBook(data: CreateBookDto) {
    this.logger.log(`Creating a new book with title: ${data.title}`);
    try {
      const createdBook = await this.prismaService.book.create({
        data: {
          title: data.title,
          bookAuthor: {
            create: data.authorIds.map((authorId) => ({
              author: {
                connect: { id: authorId },
              },
            })),
          },
        },
        include: {
          bookAuthor: {
            include: {
              author: true,
            },
          },
        },
      });
      return createdBook;
    } catch (createBookError) {
      this.logger.error({ createBookError });
      throw new Error('Error creating book');
    }
  }

  async addBookToUser(
    userId: number,
    bookId: number,
    data: Omit<AssignBookDto, 'bookId'>,
  ) {
    this.logger.log(`Assigning book ${bookId} to user ${userId}`);

    try {
      await this.prismaService.userBook.upsert({
        where: {
          userId_bookId: { userId, bookId },
        },
        update: {
          priority: data.priority,
          rating: data.rating,
          status: data.status,
        },
        create: {
          userId,
          bookId,
          priority: data.priority,
          rating: data.rating,
          status: data.status,
        },
      });

      // Обновление среднего рейтинга книги
      const ratings = await this.prismaService.userBook.findMany({
        where: { bookId },
        select: { rating: true },
      });

      const ratingsSum = ratings.reduce((sum, r) => sum + r.rating, 0);

      const averageRating = ratingsSum / (ratings.length || 1);

      await this.prismaService.book.update({
        where: { id: bookId },
        data: {
          averageRating: averageRating || 0,
        },
      });

      return this.prismaService.userBook.findUnique({
        where: {
          userId_bookId: { userId, bookId },
        },
      });
    } catch (updatingBookError) {
      this.logger.error({ updatingBookError });
      throw new Error('Error assigning book to user');
    }
  }

  async updateBook(userId: number, bookId: number, data: UpdateBookDto) {
    try {
      this.logger.log(`updating a book ${bookId}`);
      const book = await this.prismaService.book.update({
        where: { id: bookId },
        data,
      });
      return book;
    } catch (updatingBookError) {
      this.logger.error({ updatingBookError });
    }
  }

  async findAllBooks({ limit = 10, offset = 0 }: IGetBooksParams) {
    this.logger.log(`Get all books`);
    try {
      const foundBooks = await this.prismaService.book.findMany({
        take: limit,
        skip: offset,
      });

      return foundBooks;
    } catch (findAllBooksError) {
      this.logger.error({ findAllBooksError });
    }
  }

  async findAllBooksForUser(userId: number) {
    this.logger.log(`finding all books for '${userId}'`);
    return this.prismaService.userBook.findMany({
      where: { userId },
      include: {
        book: {
          include: {
            bookAuthor: {
              include: {
                author: true,
              },
            },
          },
        },
      },
      orderBy: { book: { createdAt: 'desc' } },
    });
  }

  async removeBookFromUser(userId: number, bookId: number) {
    return this.prismaService.userBook.delete({
      where: {
        userId_bookId: { userId, bookId },
      },
    });
  }
}
