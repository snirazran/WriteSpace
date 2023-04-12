import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetAllUsersDTO } from './dtos/get-users.dto';
import { GetUserByIdDTO } from './dtos/get-user.dto';
import { GetUserFriendsDTO } from './dtos/get-user-friends.dto';
import { AddRemoveFriendDTO } from './dtos/add-remove-friends.dto';

@Controller('/api/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Get All Users
  @Get('/')
  async findAllUsers(): Promise<GetAllUsersDTO[] | undefined> {
    try {
      return await this.appService.getAllUsers();
    } catch (e) {
      if (e instanceof UsersNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  //Get User By Id
  @Get('/:id')
  async findUserById(
    @Param() { id }: { id: string },
  ): Promise<GetUserByIdDTO | undefined> {
    try {
      return await this.appService.getUserById(id);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  // //Get User Friends List
  // @Get('/:id/friends')
  // async findUserFriends(
  //   @Param() { id }: { id: string },
  // ): Promise<GetUserFriendsDTO | undefined> {
  //   try {
  //     return await this.appService.getUserFriends(id);
  //   } catch (e) {
  //     if (e instanceof UserNotFoundError) {
  //       throw new NotFoundException();
  //     }
  //   }
  // }

  // //Add / Remove User Friend
  // @Patch('/:id/:friendId')
  // async addRemoveFriend(
  //   @Param() { id, friendId }: { id: string; friendId: string },
  // ): Promise<AddRemoveFriendDTO | undefined> {
  //   try {
  //     return await this.appService.addRemoveFriend(id, friendId);
  //   } catch (e) {
  //     if (e instanceof UserNotFoundError) {
  //       throw new NotFoundException();
  //     }
  //   }
  // }
}
