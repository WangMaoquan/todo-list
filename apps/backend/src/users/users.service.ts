import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { md5 } from '../utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signin(CreateUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      username: CreateUserDto.username,
    });

    if (!user) throw new HttpException('Invalid username or password', 200);

    if (user.password !== md5(CreateUserDto.password))
      throw new HttpException('Invalid username or password', 200);

    return user;
  }

  async signup(UpdateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findOne({
        username: UpdateUserDto.username,
      })
      .exec();

    if (user) throw new HttpException('用户已存在', 200);

    try {
      const createUser = new this.userModel({
        username: UpdateUserDto.username,
        password: md5(UpdateUserDto.password),
      });

      return createUser.save();
    } catch (e) {
      throw new HttpException('注册失败', 200);
    }
  }
}
