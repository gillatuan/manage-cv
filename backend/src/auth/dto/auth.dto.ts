import { RoleEnum } from '@/modules/users/dto/user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class AuthPayload {
  id: string;
  email: string;
  providerId?: string;
  phone: string;
  address: string;
  image: string;
  role: RoleEnum;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
