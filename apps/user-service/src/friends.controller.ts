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
import { ApiTags, ApiParam, ApiHeader, ApiResponse } from '@nestjs/swagger';
import {
  UserNotAuthorized,
  UserFriendsNotFoundError,
  UserNotFoundError,
  UsersNotFoundError,
} from './errors';

@ApiHeader({
  name: 'Friends-API',
  description: 'Friends related endpoints',
})
@ApiTags('friends')
@Controller('/api/friends')
export class FriendController {
  constructor(private readonly friendsService: FriendsService) {}

  //Get User Friends List
  @Get('/:id')
  @ApiResponse({ type: GetUserFriendsRequestDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getUserFriends(
    @Param() { id }: { id: string },
  ): Promise<GetUserFriendsRequestDTO[] | undefined> {
    try {
      return await this.friendsService.getUserFriends(id);
    } catch (e) {
      if (e instanceof UserFriendsNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  //Add / Remove User Friend
  @Patch('/:id/:friendId')
  @ApiResponse({ type: AddRemoveFriendDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @ApiParam({
    name: 'friendId',
    required: true,
    description: 'string for the friend id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async addRemoveFriend(
    @Param() { id }: { id: string },
    @Param() { friendId }: { friendId: string },
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
