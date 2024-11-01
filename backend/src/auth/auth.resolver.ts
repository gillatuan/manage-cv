import { Public } from '@/helpers/setPubicPage';
import {
  RegisterUserInput,
  RegisterUserResponse,
} from '@/modules/users/dto/user.dto';
import { UsersService } from '@/modules/users/users.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginResponse } from './dto/auth.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /* @Mutation(() => RegisterUserResponse)
  @Public()
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<RegisterUserResponse> {
    return this.usersService.registerUser(registerUserInput);
  } */

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
