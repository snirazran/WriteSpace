import { Injectable } from '@nestjs/common';
import { DBUser } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/Create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserAlreadyExists, UserNotFoundError, InvalidDetails } from './errors';
import { LoginUserReqDto } from './dtos/Login-user.dto';
import { LoginUserResDto } from './dtos/Login-user-response.dto';
import { CreateUserResponseDto } from './dtos/Create-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private userModel: Model<DBUser>,
    private jwtService: JwtService,
  ) {}

  //Register new User
  async registerUser(userData: CreateUserDto): Promise<CreateUserResponseDto> {
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
    user.token = this.jwtService.sign(
      { email: user.email },
      {
        expiresIn: '30d',
      },
    ); // generate token

    return user.save();
  }

  //Register new User
  async loginUser(userData: LoginUserReqDto): Promise<LoginUserResDto> {
    // Check if user exists
    const user = await this.userModel.findOne({ email: userData.email }).exec();
    if (!user) {
      throw new UserNotFoundError();
    }

    const passwordValid = await compare(userData.password, user.password);
    if (!passwordValid) {
      throw new InvalidDetails();
    }

    return user;
  }
}
