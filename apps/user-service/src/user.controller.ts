import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetAllUsersDTO } from './dtos/get-users.dto';
import { GetUserByIdDTO } from './dtos/get-user.dto';
import { ApiTags, ApiHeader, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  DocumentsNotFound,
  UserNotFoundError,
  UsersNotFoundError,
} from './errors';
import { GetUserLikesDTO } from './dtos/get-user-likes-res.dto';

@ApiTags('users')
@ApiHeader({
  name: 'Users-API',
  description: 'User related endpoints',
})
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Get All Users
  @Get('/')
  @ApiResponse({ type: GetAllUsersDTO })
  async getAllUsers(): Promise<GetAllUsersDTO | undefined> {
    try {
      return { users: await this.userService.getAllUsers() };
    } catch (e) {
      if (e instanceof UsersNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  //Get User By Id
  @Get('/:id')
  @ApiResponse({ type: GetUserByIdDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getUserById(
    @Param() { id }: { id: string },
  ): Promise<GetUserByIdDTO | undefined> {
    try {
      return await this.userService.getUserById(id);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  //Get User likes By Id
  @Get('/likes/:id')
  @ApiResponse({ type: GetUserLikesDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getUserLikes(
    @Param() { id }: { id: string },
  ): Promise<GetUserLikesDTO | undefined> {
    try {
      return await this.userService.getUserLikes(id);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
      if (e instanceof DocumentsNotFound) {
        throw new NotFoundException();
      }
    }
  }
}
