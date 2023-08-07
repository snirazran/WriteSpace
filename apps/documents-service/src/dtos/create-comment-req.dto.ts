import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentRequestDTO {
  @ApiProperty({
    description: 'comment content',
    required: true,
  })
  content: string;
}
