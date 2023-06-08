import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateProjectRequestDTO {
  @ApiProperty({
    description: 'User id',
  })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'Project genre',
    required: true,
  })
  genre: string;
}
