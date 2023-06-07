import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
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
    nullable: true,
    description: 'User img',
    default: '',
  })
  img: string | undefined;
}
