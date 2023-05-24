import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IUser } from 'src/types/user';

export class CreateUserDto implements Omit<IUser, 'password'> {
  @ApiProperty({
    description: 'User name',
    minimum: 2,
    maximum: 20,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email',
    maximum: 40,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    minimum: 6,
    maximum: 20,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Friends list',
    default: [],
  })
  friends: Array<string>;

  @ApiProperty({
    description: 'User bio',
    maximum: 200,
    default: '',
  })
  bio: string;

  @ApiProperty({
    description: 'User img',
    maximum: 100,
    default: '',
  })
  img: string;
}
