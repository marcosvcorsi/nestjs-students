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
import { RemoveStudentCourseInput } from 'src/dtos/remove-student-course.dto';
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
    const { id, courses, ...input } = data;

    return this.studentsService.update(id, {
      ...input,
      courses: {
        connectOrCreate: courses.map((courseId) => ({
          where: {
            studentId_courseId: {
              courseId: courseId,
              studentId: id,
            },
          },
          create: {
            courseId: courseId,
          },
        })),
      },
    });
  }

  @Mutation(() => Student)
  async removeStudentCourse(
    @Args('data') data: RemoveStudentCourseInput,
  ): Promise<Student> {
    const { studentId, courseId } = data;

    return this.studentsService.update(studentId, {
      courses: {
        delete: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
      },
    });
  }

  @ResolveField()
  async courses(@Parent() student: Student): Promise<Course[]> {
    return this.coursesService.findByStudent(student.id);
  }
}
