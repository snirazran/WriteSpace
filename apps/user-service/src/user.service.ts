import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Get All Users
  async getAllUsers(): Promise<User[]> {
    const docs = await this.userModel.find({}).exec();

    if (!docs) {
      throw new UsersNotFoundError();
    }

    const filteredUsers = docs.reduce((acc: User[], obj) => {
      const { username, email, friends, bio, img } = obj;
      const user = Object.fromEntries([
        ['username', username],
        ['email', email],
        ['friends', friends],
        ['bio', bio],
        ['img', img],
      ]);
      acc.push(user);
      return acc;
    }, []);

    return filteredUsers;
  }

  //Get User by Id
  async getUserById(id: string): Promise<User> {
    const doc = await this.userModel.findById(id).exec();

    if (!doc) {
      throw new UserNotFoundError();
    }

    return doc.toObject();
  }
}
