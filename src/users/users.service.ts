import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async create(UserDto: createUserDto): Promise<User> {
    UserDto.password = await this.encryptPassword(UserDto.password)
    return new this.userModel(UserDto).save()
  }

  async login(UserDto: loginUserDto): Promise<string> {
    return await this.userModel
      .findOne({ email: UserDto.email })
      .then(user => bcrypt.compare(UserDto.password, user.password) ? `${user._id}` : '')
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, UserDto: updateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, UserDto)
  }

  remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id)
  }

  private async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10
    const hashedPass = await bcrypt.hash(password, saltOrRounds)
    return hashedPass
  }
}
