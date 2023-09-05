import { ApiProperty } from '@nestjs/swagger';

export class isServerUpDTO {
  @ApiProperty({
    description: 'message',
    type: String,
  })
  message: string;
}
