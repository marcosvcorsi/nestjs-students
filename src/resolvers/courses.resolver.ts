import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCourseDto } from 'src/dtos/create-course.dto';
import { UpdateCourseDto } from 'src/dtos/update-course.dto';
import { Course } from 'src/models/course.model';
import { CoursesServices } from 'src/services/courses.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesServices) {}

  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    return this.coursesService.find();
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
  async createCourse(@Args('data') data: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(data);
  }

  @Mutation(() => Course)
  async updateCourse(@Args('data') data: UpdateCourseDto): Promise<Course> {
    const { id, ...input } = data;

    return this.coursesService.update(id, input);
  }
}
