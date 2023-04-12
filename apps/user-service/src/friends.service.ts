import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUserFriendsResponseDTO } from './dtos/get-user-friends.dto';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Get Users
  async getUserFriends(id: string): Promise<GetUserFriendsResponseDTO[]> {
    const doc = await this.userModel.findById(id).exec();

    if (!doc) {
      throw new UserNotFoundError();
    }

    const friendPromises = doc.friends.map((id) => this.userModel.findById(id));
    const friends = await Promise.all(friendPromises);

    if (!friends || friends.length === 0) {
      throw new UserFriendsNotFoundError();
    }

    const formattedFriends = friends.map(({ id, username, bio, img }) => ({
      id,
      username,
      bio,
      img,
    }));

    return formattedFriends;
  }

  //Get User by Id
  async addRemoveFriend(id: string, friendId: string): Promise<User> {}
}
