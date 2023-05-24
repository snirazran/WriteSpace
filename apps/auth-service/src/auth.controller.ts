import { Controller, Get, Post, Body, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/Create-user.dto';
import { ApiTags, ApiHeader, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserAlreadyExists, InvalidDetails } from './errors';
import { LoginUserReqDto } from './dtos/Login-user.dto';
import { LoginUserResDto } from './dtos/Login-user-response.dto';
import { CreateUserResponseDto } from './dtos/Create-user-response.dto';

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
  @ApiResponse({ type: CreateUserResponseDto })
  async registerUser(
    @Body() userData: CreateUserDto,
  ): Promise<CreateUserResponseDto | undefined> {
    try {
      return await this.authService.registerUser(userData);
    } catch (e) {
      if (e instanceof UserAlreadyExists) {
        throw new ConflictException('User already exists');
      }
    }
  }

  //Login user
  @Post('/login')
  @ApiResponse({ type: LoginUserResDto })
  async loginUser(
    @Body() userData: LoginUserReqDto,
  ): Promise<LoginUserResDto | undefined> {
    try {
      return await this.authService.loginUser(userData);
    } catch (e) {
      if (e instanceof UserAlreadyExists) {
        throw new ConflictException('User already exists');
      }
      if (e instanceof InvalidDetails) {
        throw new ConflictException('Invalid email or password');
      }
    }
  }
}
