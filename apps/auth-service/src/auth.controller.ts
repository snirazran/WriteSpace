import { Controller, Get, Post, Body, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/Create-user.dto';
import { ApiTags, ApiHeader, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserAlreadyExists } from './errors';

@ApiTags('auth')
@ApiHeader({
  name: 'Auth-API',
  description: 'Auth related endpoints',
})
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Register new user
  @Post('/')
  @ApiResponse({ type: CreateUserDto })
  async getAllUsers(
    @Body() userData: CreateUserDto,
  ): Promise<CreateUserDto | undefined> {
    try {
      return await this.authService.registerUser(userData);
    } catch (e) {
      if (e instanceof UserAlreadyExists) {
        throw new ConflictException('User already exists');
      }
    }
  }
}
