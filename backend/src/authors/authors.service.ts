import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string }) {
    return this.prisma.author.create({ data });
  }

  async findAll(): Promise<AuthorDto[]> {
    return this.prisma.author.findMany();
  }
}
