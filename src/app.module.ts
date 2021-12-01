import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentsResolver } from './resolvers/students.resolver';
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
  providers: [PrismaService, StudentsResolver, StudentsService],
})
export class AppModule {}
