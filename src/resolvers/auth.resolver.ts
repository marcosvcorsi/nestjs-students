import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthInput, AuthType } from 'src/dtos/auth.dto';
import { AuthService } from 'src/services/auth.service';

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('data') data: AuthInput): Promise<AuthType> {
    return this.authService.login(data);
  }
}
