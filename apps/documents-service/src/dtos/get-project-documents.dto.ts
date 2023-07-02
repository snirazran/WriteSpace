import { ApiProperty } from '@nestjs/swagger';
import { DocumentResponseDTO } from './document.dto';

export class GetAllProjectDocumentsDTO {
  @ApiProperty({
    description: 'Documents',
    type: [DocumentResponseDTO],
  })
  documents: Array<DocumentResponseDTO>;
}
