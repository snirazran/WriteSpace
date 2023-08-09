import { ApiProperty } from '@nestjs/swagger';

export class GetUserLikesDTO {
  @ApiProperty({
    description: 'User likes',
  })
  totalLikes: number;
}
