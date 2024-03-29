import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserReqDto {
  @ApiProperty({
    description: 'Email',
    maximum: 40,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsNotEmpty()
  password: string;
}
