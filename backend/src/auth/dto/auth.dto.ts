import { RoleEnum } from '@/modules/users/dto/user.dto';
import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
@ArgsType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
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
export class JWTAccessToken {
  accessToken: string
  refreshToken: string
}
