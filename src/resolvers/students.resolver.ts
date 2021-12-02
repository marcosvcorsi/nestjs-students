import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateStudentInput } from 'src/dtos/create-student.dto';
import { UpdateStudentInput } from 'src/dtos/update-student.dto';
import { Course } from 'src/models/course.model';
import { Student } from 'src/models/student.model';
import { CoursesServices } from 'src/services/courses.service';
import { StudentsService } from 'src/services/students.service';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesServices,
  ) {}

  @Query(() => [Student])
  async students(): Promise<Student[]> {
    return this.studentsService.find();
  }

  @Query(() => Student)
  async student(@Args('id') id: string): Promise<Student> {
    const student = await this.studentsService.findById(id);

    if (!student) {
      throw new NotFoundException(id);
    }

    return student;
  }

  @Mutation(() => Student)
  createStudent(@Args('data') data: CreateStudentInput): Promise<Student> {
    return this.studentsService.create(data);
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args('data') data: UpdateStudentInput,
  ): Promise<Student> {
    const { id, courses: coursesIds, ...input } = data;

    const courses = await this.coursesService.findByIds(coursesIds);

    return this.studentsService.update(id, {
      ...input,
      courses: {
        connectOrCreate: courses.map((course) => ({
          where: {
            studentId_courseId: {
              courseId: course.id,
              studentId: id,
            },
          },
          create: {
            courseId: course.id,
          },
        })),
      },
    });
  }

  @ResolveField()
  async courses(@Parent() student: Student): Promise<Course[]> {
    return this.coursesService.findByStudent(student.id);
  }
}
