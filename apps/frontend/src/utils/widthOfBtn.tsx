import { DocumentResponseDTO } from 'api-client/documents';
import { ProjectResponseDTO } from 'api-client/projects';

let width = 200;
const widthMove = (
  items: Array<ProjectResponseDTO> | Array<DocumentResponseDTO>
) => {
  if (items.length === 1) {
    return width;
  }
  for (let item of items) {
    if (width > 9000) {
      return width;
    }
    width += 220;
  }
  return width - 220;
};

export default widthMove;
