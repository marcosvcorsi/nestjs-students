import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Student } from './student.model';

@ObjectType({ description: 'course' })
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Student], { nullable: true })
  students?: Student[];
}
