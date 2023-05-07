import { Injectable } from '@nestjs/common';
import { DBUser } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUserFriendsResponseDTO } from './dtos/get-user-friends.dto';
import { UserService } from './user.service';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(DBUser.name) private userModel: Model<DBUser>,
    private userService: UserService,
  ) {}

  //Get the user friends
  async getUserFriends(id: string): Promise<GetUserFriendsResponseDTO[]> {
    const { friends: friendsIds } = await this.userService.getUserById(id);

    const tasks = [];

    for (const friendId of friendsIds) {
      tasks.push(this.getUserFriend(id, friendId));
    }

    const friends = (await Promise.all(tasks)).filter((f): f is DBUser => !!f);

    if (!friends?.length) {
      throw new UserFriendsNotFoundError();
    }

    return friends;
  }

  private getUserFriend(userId: string, friendId: string) {
    try {
      return this.userService.getUserById(friendId);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        console.error(`Friend of ${userId} not found`, e);
      }
    }
  }

  //addRemoveFriend to the user friends
  async addRemoveFriend(id: string, friendId: string): Promise<DBUser> {
    const user = await this.userModel.findById(id).exec();
    const friend = await this.userModel.findById(friendId).exec();
    if (!user || !friend) throw new UserNotFoundError();
    if (!user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    return user.toObject();
  }
}