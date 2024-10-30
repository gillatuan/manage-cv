import { Public } from '@/helpers/setPubicPage';
import {
  RegisterUserInput,
  RegisterUserResponse,
} from '@/modules/users/dto/user.dto';
import { UsersService } from '@/modules/users/users.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => RegisterUserResponse)
  @Public()
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<RegisterUserResponse> {
    return this.usersService.registerUser(registerUserInput);
  }
}
