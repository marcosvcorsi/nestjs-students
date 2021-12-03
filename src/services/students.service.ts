import { Prisma, Student } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

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

    return this.prismaService.student.create({
      data,
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
