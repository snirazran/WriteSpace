import {
  Controller,
  Put,
  Post,
  Body,
  Request,
  UseGuards,
  ConflictException,
  UnauthorizedException,
  Param,
  Get,
  NotFoundException,
  HttpCode,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/Create-user.dto';
import { ApiTags, ApiHeader, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  UserAlreadyExists,
  InvalidDetails,
  UserNotFoundError,
  ServiceNotRunning,
} from './errors';
import { LoginUserReqDto } from './dtos/Login-user.dto';
import { LoginUserResDto } from './dtos/Login-user-response.dto';
import { CreateUserResponseDto } from './dtos/Create-user-response.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateUserResDto } from './dtos/Update-user-response.dto';
import { UpdateUserReqDto } from './dtos/Update-user.dto';
import { isServerUpDTO } from './dtos/isup.dto';

@ApiTags('auth')
@ApiHeader({
  name: 'Auth-API',
  description: 'Auth related endpoints',
})
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Is server up
  @Get('/')
  @ApiResponse({ type: isServerUpDTO })
  async isServerUp(): Promise<isServerUpDTO | undefined> {
    try {
      return await this.authService.isServerUp();
    } catch (e) {
      if (e instanceof ServiceNotRunning) {
        throw new RequestTimeoutException();
      }
    }
  }

  //Register new user
  @Post('/')
  @HttpCode(201)
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
  @HttpCode(200)
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

  @UseGuards(JwtAuthGuard)
  @Put('updateUser/:id')
  @ApiResponse({ type: UpdateUserResDto })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async updateUser(
    @Param('id') id: string,
    @Request() req,
    @Body() userData: UpdateUserReqDto,
  ): Promise<UpdateUserResDto | undefined> {
    // Check if the user is the same as the one that is logged in
    if (req.user._id !== id) {
      throw new UnauthorizedException();
    }
    // Update user
    try {
      return await this.authService.updateUser(id, userData);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
