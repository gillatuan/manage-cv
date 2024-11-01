import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { RoleEnum } from '../dto/user.dto';

@ObjectType()
export class User {
  @Field(() => ID) //<- GraphQL
  @IsMongoId()
  _id: ObjectId;

  @Field()
  id: string;

  @Prop({ required: true, unique: true }) //<- Mongoose
  @Field()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ nullable: true })
  providerId?: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  image: string;

  @Prop({ required: true, default: RoleEnum.Member })
  role: RoleEnum;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: string;

  @Prop({ default: new Date() })
  createdAt?: Date;

  @Prop({ default: new Date() })
  updatedAt?: Date;
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);
