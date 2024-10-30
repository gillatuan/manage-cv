import { UsersService } from '@/modules/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, LoginInput } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginInput: LoginInput) {
    const user = await this.usersService.findByEmail(loginInput.email);
    if (!user) {
      throw new NotFoundException('Khong co use nay');
    }

    return null;
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

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
