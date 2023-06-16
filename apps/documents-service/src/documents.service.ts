import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DBDocument } from './schemas/document.schema';
import { DocumentNotFound, DocumentsNotFound, InvalidDetails } from './errors';
import { DocumentResponseDTO } from './dtos/document.dto';
import { CreateDocumentRequestDTO } from './dtos/create-document-req.dto';
import { DeleteDocumentResDTO } from './dtos/delete.document.res.dto';
import { UpdateDocumentRequestDTO } from './dtos/update-document-req.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('documents') private documentModel: Model<DBDocument>,
  ) {}

  //Create a new document
  async createDocument(
    DocumentData: CreateDocumentRequestDTO,
  ): Promise<DocumentResponseDTO> {
    try {
      const document = new this.documentModel(DocumentData);

      await document.save();

      const documentPlainObject = document.toObject();
      const documentStringId: DocumentResponseDTO = {
        ...documentPlainObject,
        _id: document._id.toString(),
      };
      return documentStringId;
    } catch (error) {
      if (error.name === 'CastError' && error.path === 'userId') {
        throw new InvalidDetails();
      }
      throw error;
    }
  }

  //Get all project documents
  async getAllProjectDocuments(id: string): Promise<DocumentResponseDTO[]> {
    const docs = await this.documentModel
      .find({ projectId: id })
      .populate('projectId', 'userId')
      .exec();

    if (!docs) {
      throw new DocumentsNotFound();
    }

    const filteredDocuments = docs.map((obj) => {
      const { _id, name, userId, type, content, shared, projectId, wordCount } =
        obj;
      const documents = {
        _id: _id.toString(), // Convert ObjectId to string
        projectId,
        userId,
        name,
        type,
        content,
        wordCount,
        shared,
      };
      return documents;
    });

    return filteredDocuments;
  }

  //Get a document by id
  async getDocumentById(documentId: string): Promise<DocumentResponseDTO> {
    const document = await this.documentModel
      .findById(documentId)
      .populate('projectId', 'userId')
      .exec();

    if (!document) {
      throw new DocumentNotFound();
    }

    const documentPlainObject = document.toObject();
    const documentStringId: DocumentResponseDTO = {
      ...documentPlainObject,
      _id: document._id.toString(),
    };

    return documentStringId;
  }

  //Update a document
  async updateDocument(
    id: string,
    documentData: UpdateDocumentRequestDTO,
  ): Promise<DocumentResponseDTO> {
    // Check if document exists
    const document = await this.documentModel
      .findById(id)
      .populate('projectId', 'userId')
      .exec();
    if (!document) {
      throw new DocumentNotFound();
    }
    // Update document

    const updatedDocument = await this.documentModel.findByIdAndUpdate(
      id,
      documentData,
      {
        new: true,
      },
    );

    if (!updatedDocument) {
      throw new DocumentNotFound();
    }
    const documentPlainObject = document.toObject();
    const documentStringId: DocumentResponseDTO = {
      ...documentPlainObject,
      _id: document._id.toString(),
    };

    return documentStringId;
  }

  //Delete a Document
  async deleteDocument(id: string): Promise<DeleteDocumentResDTO> {
    // Check if project exists
    const document = await this.documentModel
      .findById(id)
      .populate('projectId', 'userId')
      .exec();
    if (!document) {
      throw new DocumentNotFound();
    }

    await document.remove();

    const deleteDocumentResDTO: DeleteDocumentResDTO = { _id: id };
    return deleteDocumentResDTO;
  }
}
