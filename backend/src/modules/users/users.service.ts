import { LoginInput } from '@/auth/dto/auth.dto';
import { compare2Password, setHashPassword } from '@/helpers/utils';
import { User } from '@/modules/users/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import dayjs from 'dayjs';
import { Model } from 'mongoose';
import ms from 'ms';
import { MongoRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/create-user.input';
import {
  FilterDto,
  RegisterUserInput,
  RegisterUserResponse,
  RoleEnum,
  UpdateUserInput,
} from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = compare2Password(password, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  async login(loginInput: LoginInput): Promise<User> {
    const { email, password } = loginInput;
    const findUser = await this.validateUser(email, password);

    // return the user
    return findUser;
  }

  isEmailExist = async (email: string) => {
    const user = await this.userModel.findOne({ email });
    if (user) return true;
    return false;
  };

  async registerUser(
    registerUserInput: RegisterUserInput,
  ): Promise<RegisterUserResponse> {
    const { email, password } = registerUserInput;

    //check email
    const isExist = await this.isEmailExist(email);
    if (isExist === true) {
      throw new BadRequestException(
        `Email đã tồn tại: ${email}. Vui lòng sử dụng email khác.`,
      );
    }

    //hash password
    const hashPassword = await setHashPassword(password);
    const codeId = uuidv4();
    const id = uuidv4();
    const data = {
      ...registerUserInput,
      id,
      email,
      password: hashPassword,
      isActive: false,
      codeId: codeId,
      role: RoleEnum.Member,
      codeExpired: dayjs().add(300, 'seconds').toISOString(),
    };
    await this.userModel.create(data);

    delete data.password;
    //trả ra phản hồi
    return data;
  }

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ id });
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const checkExistUser = this.userModel.findOne({ id });
    if (!checkExistUser) {
      throw new NotFoundException('Khong ton tai use nay');
    }
    const getHashPassword = await setHashPassword(updateUserInput.password);
    await this.userModel.updateOne(
      { id },
      { ...updateUserInput, password: getHashPassword },
    );

    return 'Update user OK';
  }

  async remove(id: string) {
    if (isUUID(id)) {
      const checkUserIsAdmin = await this.userModel.findOne({
        id,
        role: RoleEnum.Admin,
      });
      if (!checkUserIsAdmin) {
        const idSlice = id.slice();
        this.userModel.deleteOne({ id });
        return idSlice;
      }

      throw new BadRequestException('Ban khong co quyen xoa');
    }
    throw new BadRequestException('Id ko dung dinh dang');
  }

  async searchTerms(filterDto: FilterDto) {
    const { isActive, s } = filterDto;

    if (isActive) {
      return await this.userModel.findOne({ isActive });
    }

    if (s) {
      return await this.userModel.find({
        where: {
          email: { $regex: new RegExp(s, 'i') }, // Case-insensitive substring match
        },
      });
    }

    return await this.userModel.find();
  }
}
