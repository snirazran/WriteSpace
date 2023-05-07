import { Injectable } from '@nestjs/common';
import { DBUser } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(DBUser.name) private userModel: Model<DBUser>) {}

  //Get All Users
  async getAllUsers(): Promise<DBUser[]> {
    const docs = await this.userModel.find({}).exec();

    if (!docs) {
      throw new UsersNotFoundError();
    }

    const filteredUsers = docs.reduce((acc: DBUser[], obj) => {
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
  async getUserById(id: string): Promise<DBUser> {
    const doc = await this.userModel.findById(id).exec();

    if (!doc) {
      throw new UserNotFoundError();
    }

    return doc.toObject();
  }
}
