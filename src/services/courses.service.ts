import { Course, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CoursesServices {
  constructor(private readonly prismaService: PrismaService) {}

  async findByIds(ids: string[]): Promise<Course[]> {
    return this.prismaService.course.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findById(id: string): Promise<Course> {
    return this.prismaService.course.findUnique({
      where: {
        id,
      },
    });
  }

  async find(): Promise<Course[]> {
    return this.prismaService.course.findMany();
  }

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prismaService.course.create({
      data,
    });
  }

  async update(id: string, data: Prisma.CourseUpdateInput): Promise<Course> {
    return this.prismaService.course.update({
      where: {
        id,
      },
      data,
    });
  }

  async findByStudent(studentId: string): Promise<Course[]> {
    return this.prismaService.course.findMany({
      where: {
        students: {
          some: {
            studentId,
          },
        },
      },
    });
  }
}
