import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { GetUserFriendsRequestDTO } from './dtos/get-user-friends.dto';
import { AddRemoveFriendDTO } from './dtos/add-remove-friends.dto';

@Controller('/api/friends')
export class FriendController {
  constructor(private readonly friendsService: FriendsService) {}

  //Get User Friends List
  @Get('/:id/friends')
  async getUserFriends(
    @Param() { id }: { id: string },
  ): Promise<GetUserFriendsRequestDTO[] | undefined> {
    try {
      return await this.friendsService.getUserFriends(id);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  //Add / Remove User Friend
  @Patch('/:id/:friendId')
  async addRemoveFriend(
    @Param() { id, friendId }: { id: string; friendId: string },
  ): Promise<AddRemoveFriendDTO | undefined> {
    try {
      return await this.friendsService.addRemoveFriend(id, friendId);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
