import { compare2Password } from '@/helpers/utils';
import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, LoginInput } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginInput: LoginInput): Promise<User> {
    const { email, password } = loginInput;

    const findUser = await this.usersService.findOne(email);
    if (!findUser) {
      return null;
    }

    const isMatch = compare2Password(password, findUser.password);
    if (!isMatch) {
      return null;
    }

    // return the user
    return findUser;
  }

  async login(loginInput: LoginInput) {
    const findUser = await this.usersService.findOne(loginInput.email);
    return {
      accessToken: 'accessToken',
      user: findUser,
    };
  }

  async createAccessToken(user: AuthPayload) {
    const payload = { sub: user.id, ...user };
    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }

  async createRefreshToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
