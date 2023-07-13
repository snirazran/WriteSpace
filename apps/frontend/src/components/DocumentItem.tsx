import { DocumentResponseDTO } from 'api-client/documents';

type DocumentItemProp = {
  document: DocumentResponseDTO;
};

const DocumentItem: React.FC<DocumentItemProp> = ({ document }) => {
  return (
    <div className="document-box">
      <div className="document-box-text ">
        <h1>{document?.name}</h1>
        <p>{document?.type}</p>
      </div>
    </div>
  );
};

export default DocumentItem;
