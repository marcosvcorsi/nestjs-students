import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Course } from './course.model';

@ObjectType({ description: 'student' })
export class Student {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Course], { nullable: true })
  courses?: Course[];
}
