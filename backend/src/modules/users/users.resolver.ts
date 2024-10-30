import { Public } from '@/helpers/setPubicPage';
import { Response } from '@/lib/transform.interceptor';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserResponse } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  @Public()
  hello(): string {
    return 'Hello World'
  }
}
