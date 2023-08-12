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
import { UpdateUserReqDto } from './dtos/Update-user.dto';
import { UpdateUserResDto } from './dtos/Update-user-response.dto';

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
    const TOKEN_EXPIRY = '30d';
    user.img =
      'https://firebasestorage.googleapis.com/v0/b/writespace-f343f.appspot.com/o/projectImages%2Fuserplaceholder.png3e796394-9401-4682-976c-953e87e611e1?alt=media&token=edbf545b-68f8-4aea-b648-f16d4143f464';
    user.password = await hash(user.password, 10); // bcrypt password hashing
    user.token = this.jwtService.sign(
      { _id: user._id },
      {
        expiresIn: TOKEN_EXPIRY,
      },
    ); // generate token

    user.save();

    const userPlainObject = user.toObject();
    const userStringId: CreateUserResponseDto = {
      ...userPlainObject,
      _id: user._id.toString(),
    };
    return userStringId;
  }

  //Login User
  async loginUser(userData: LoginUserReqDto): Promise<LoginUserResDto> {
    // Check if user exists
    const user = await this.userModel
      .findOne({ email: userData.email })
      .select('+password')
      .exec();
    if (!user) {
      throw new UserNotFoundError();
    }

    const passwordValid = await compare(userData.password, user.password);
    if (!passwordValid) {
      throw new InvalidDetails();
    }

    const userPlainObject = user.toObject();
    const userStringId: LoginUserResDto = {
      ...userPlainObject,
      _id: user._id.toString(),
    };

    return userStringId;
  }

  async updateUser(
    id: string,
    userData: UpdateUserReqDto,
  ): Promise<UpdateUserResDto> {
    // Check if user exists
    const user = await this.userModel.findById(id).select('+password').exec();
    if (!user) {
      throw new UserNotFoundError();
    }
    // Update user
    const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, {
      new: true,
    });

    const userPlainObject = updatedUser.toObject();
    const userStringId: UpdateUserResDto = {
      ...userPlainObject,
      _id: user._id.toString(),
    };

    return userStringId;
  }
}
