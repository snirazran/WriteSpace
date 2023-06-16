import { ApiProperty } from '@nestjs/swagger';

export class DeleteDocumentResDTO {
  @ApiProperty({
    description: 'document id',
  })
  _id: string;
}
