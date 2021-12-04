import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class RemoveStudentCourseInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  studentId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  courseId: string;
}
