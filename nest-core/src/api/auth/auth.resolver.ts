import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './entities/auth.entity';
import { LoginInput } from './dto/create-auth.input';
// import { UpdateAuthInput } from './dto/update-auth.input';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'login'  })
  login(@Args('payload') payload: LoginInput) {
    return this.authService.login(payload);
  }

}
