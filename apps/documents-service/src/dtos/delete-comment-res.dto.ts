import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentResDTO {
  @ApiProperty({
    description: 'Comment id',
  })
  commentId: string;
}
