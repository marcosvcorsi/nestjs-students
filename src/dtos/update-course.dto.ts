import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateCourseDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
