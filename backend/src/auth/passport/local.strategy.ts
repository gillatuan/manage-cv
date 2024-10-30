import { AuthService } from '@/auth/auth.service';
import { LoginInput } from '@/auth/dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const loginInput: LoginInput = {
      email: username,
      password,
    };
    const user = await this.authService.validateUser(loginInput);
    if (!user) {
      throw new UnauthorizedException('Username/Password không hợp lệ.');
    }
    /* if (user.isActive === false) {
            throw new BadRequestException("Tài khoản chưa được kích hoạt");
        } */
    return user;
  }
}
