import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateCourseInput } from 'src/dtos/create-course.dto';
import { UpdateCourseInput } from 'src/dtos/update-course.dto';
import { GqlAuthGuard } from 'src/guards/auth.guard';
import { Course } from 'src/models/course.model';
import { Student } from 'src/models/student.model';
import { CoursesServices } from 'src/services/courses.service';
import { StudentsService } from 'src/services/students.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesServices,
    private readonly studentsService: StudentsService,
  ) {}

  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    return this.coursesService.find();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Course])
  async myCourses(@Context() context): Promise<Course[]> {
    const { user } = context.req;

    return this.coursesService.findByStudent(user.id);
  }

  @Query(() => Course)
  async course(@Args('id') id: string): Promise<Course> {
    const course = await this.coursesService.findById(id);

    if (!course) {
      throw new NotFoundException(id);
    }

    return course;
  }

  @Mutation(() => Course)
  async createCourse(@Args('data') data: CreateCourseInput): Promise<Course> {
    return this.coursesService.create(data);
  }

  @Mutation(() => Course)
  async updateCourse(@Args('data') data: UpdateCourseInput): Promise<Course> {
    const { id, students, ...input } = data;

    return this.coursesService.update(id, {
      ...input,
      ...(students
        ? {
            students: {
              connectOrCreate: students.map((studentId) => ({
                where: {
                  studentId_courseId: {
                    courseId: id,
                    studentId,
                  },
                },
                create: {
                  studentId,
                },
              })),
            },
          }
        : {}),
    });
  }

  @ResolveField()
  async students(@Parent() course: Course): Promise<Student[]> {
    return this.studentsService.findByCourse(course.id);
  }
}
