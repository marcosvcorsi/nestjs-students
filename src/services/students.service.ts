import { Prisma, Student } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { HashProvider } from 'src/provider/hash.provider';
import { PrismaService } from './prisma.service';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashProvider: HashProvider,
  ) {}

  async findByIds(ids: string[]): Promise<Student[]> {
    return this.prismaService.student.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findById(id: string): Promise<Student> {
    return this.prismaService.student.findUnique({
      where: {
        id,
      },
    });
  }

  async find(): Promise<Student[]> {
    return this.prismaService.student.findMany();
  }

  async create(data: Prisma.StudentCreateInput): Promise<Student> {
    const emailAlreadyExists = await this.prismaService.student.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailAlreadyExists) {
      throw new BadRequestException('E-mail already exists');
    }

    const hashedPassword = await this.hashProvider.generate(data.password);

    return this.prismaService.student.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async update(id: string, data: Prisma.StudentUpdateInput): Promise<Student> {
    return this.prismaService.student.update({
      data,
      where: {
        id,
      },
    });
  }

  async findByCourse(courseId: string): Promise<Student[]> {
    return this.prismaService.student.findMany({
      where: {
        courses: {
          some: {
            courseId,
          },
        },
      },
    });
  }
}
