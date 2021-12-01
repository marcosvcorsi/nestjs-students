import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import { UpdateStudentDto } from 'src/dtos/update-student.dto';
import { Student } from 'src/models/student.model';
import { StudentsService } from 'src/services/students.service';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

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
  createStudent(@Args('data') data: CreateStudentDto): Promise<Student> {
    return this.studentsService.create(data);
  }

  @Mutation(() => Student)
  updateStudent(@Args('data') data: UpdateStudentDto): Promise<Student> {
    const { id, ...input } = data;

    return this.studentsService.update(id, input);
  }
}
