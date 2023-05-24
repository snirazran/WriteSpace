import { Injectable } from '@nestjs/common';
import { DBUser } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/Create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { UserAlreadyExists } from './errors';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private userModel: Model<DBUser>,
    private jwtService: JwtService,
  ) {}

  //Register new User
  async registerUser(userData: CreateUserDto): Promise<DBUser> {
    // Check if user exists
    const existingUser = await this.userModel
      .findOne({ email: userData.email })
      .exec();
    if (existingUser) {
      throw new UserAlreadyExists();
    }

    // Create new user
    const user = new this.userModel(userData);
    user.password = await hash(user.password, 10); // bcrypt password hashing
    user.token = this.jwtService.sign({ email: user.email }); // generate token

    return user.save();
  }
}
