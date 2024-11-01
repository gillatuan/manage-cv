// user.dto.ts
import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export enum RoleEnum {
  Admin = 'Admin',
  Member = 'Member',
}

@ObjectType()
export class UserType {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty({ message: 'Email ko de trong' })
  @IsEmail({}, { message: 'Email ko dung dinh dang' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Phone ko de trong' })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'Address ko de trong' })
  address: string;

  @Field()
  image: string;

  @Field({ defaultValue: RoleEnum.Member })
  role?: RoleEnum;

  @Field({ defaultValue: false })
  isActive: boolean;
}

@InputType()
@ArgsType()
export class RegisterUserInput extends OmitType(UserType, ['id']) {
  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  image: string;
}
export class RegisterUserResponse {
  
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty({ message: 'Email ko de trong' })
  @IsEmail({}, { message: 'Email ko dung dinh dang' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Phone ko de trong' })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'Address ko de trong' })
  address: string;

  @Field()
  image: string;

  @Field({ defaultValue: RoleEnum.Member })
  role?: RoleEnum;

  @Field({ defaultValue: false })
  isActive: boolean;
}
export class UpdateUserInput extends RegisterUserInput {
  @Field()
  @IsUUID()
  id: string;
}

@InputType()
@ArgsType()
export class FilterDto {
  @Field({ nullable: true })
  @IsOptional()
  isActive: boolean;

  @Field({ nullable: true })
  @IsOptional()
  s: string;
}
