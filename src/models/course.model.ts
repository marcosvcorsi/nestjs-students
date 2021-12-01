import { Field, ID, ObjectType } from '@nestjs/graphql';

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
}
