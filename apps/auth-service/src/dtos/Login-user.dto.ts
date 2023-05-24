import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserReqDto {
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
}
