import { Field, ID, ObjectType } from '@nestjs/graphql';

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
}
