import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Student } from 'src/models/student.model';

@InputType()
export class AuthInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

@ObjectType()
export class AuthType {
  @Field(() => Student)
  student: Student;

  @Field()
  token: string;
}
