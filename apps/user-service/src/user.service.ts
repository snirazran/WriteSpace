import { Injectable } from '@nestjs/common';
import { DBUser } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotFoundError, UsersNotFoundError } from './errors';

import { UserResponseDTO } from './dtos/user-response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<DBUser>) {}

  //Get All Users
  async getAllUsers(): Promise<UserResponseDTO[]> {
    const docs = await this.userModel.find({}).exec();

    if (!docs) {
      throw new UsersNotFoundError();
    }

    const filteredUsers = docs.map((obj) => {
      const { _id, username, email, friends, bio, img } = obj;
      const user = {
        _id: _id.toString(), // Convert ObjectId to string
        username,
        email,
        friends,
        bio,
        img,
      };
      return user;
    });

    return filteredUsers;
  }

  //Get User by Id
  async getUserById(id: string): Promise<UserResponseDTO> {
    const doc = await this.userModel.findById(id).exec();

    if (!doc) {
      throw new UserNotFoundError();
    }

    const userPlainObject = doc.toObject();
    const userStringId: UserResponseDTO = {
      ...userPlainObject,
      _id: doc._id.toString(),
    };

    return userStringId;
  }
}
