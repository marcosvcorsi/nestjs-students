import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class UpdateCourseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  students: string[];
}
