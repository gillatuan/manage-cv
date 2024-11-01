import { User, UserSchema } from '@/modules/users/entities/user.entity';
import { UsersResolver } from '@/modules/users/users.resolver';
import { UsersService } from '@/modules/users/users.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
