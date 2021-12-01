import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CoursesResolver } from './resolvers/courses.resolver';
import { StudentsResolver } from './resolvers/students.resolver';
import { CoursesServices } from './services/courses.service';
import { PrismaService } from './services/prisma.service';
import { StudentsService } from './services/students.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    StudentsResolver,
    CoursesResolver,
    StudentsService,
    CoursesServices,
  ],
})
export class AppModule {}
