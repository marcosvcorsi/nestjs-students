import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
