import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { HashProvider } from './provider/hash.provider';
import { AuthResolver } from './resolvers/auth.resolver';
import { CoursesResolver } from './resolvers/courses.resolver';
import { StudentsResolver } from './resolvers/students.resolver';
import { AuthService } from './services/auth.service';
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
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    AuthResolver,
    StudentsResolver,
    CoursesResolver,
    AuthService,
    StudentsService,
    CoursesServices,
    HashProvider,
  ],
})
export class AppModule {}
