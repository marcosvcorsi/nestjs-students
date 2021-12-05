import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInput } from 'src/dtos/auth.dto';
import { HashProvider } from 'src/provider/hash.provider';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashProvider: HashProvider,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthInput) {
    const student = await this.prismaService.student.findUnique({
      where: {
        email,
      },
    });

    if (
      !student ||
      !(await this.hashProvider.compare(password, student.password))
    ) {
      throw new UnauthorizedException('E-mail or password is invalid');
    }

    const token = await this.jwtService.sign({ id: student.id });

    return {
      token,
      student,
    };
  }
}
