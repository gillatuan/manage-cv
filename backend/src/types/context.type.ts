import { Request, Response } from 'express';
import { User } from '@/modules/users/entities/user.entity';

type Ctx = {
  req: Request & { user?: Pick<User, 'email' | 'password'> };
  res: Response;
};

export default Ctx;