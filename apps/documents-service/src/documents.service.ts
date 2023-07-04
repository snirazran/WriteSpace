import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DBDocument } from './schemas/document.schema';
import {
  DocumentNotFound,
  DocumentsNotFound,
  InvalidDetails,
  ProjectNotFoundError,
  UserNotAuthorized,
  UserNotFoundError,
} from './errors';
import { DocumentResponseDTO } from './dtos/document.dto';
import { CreateDocumentRequestDTO } from './dtos/create-document-req.dto';
import { DeleteDocumentResDTO } from './dtos/delete.document.res.dto';
import { UpdateDocumentRequestDTO } from './dtos/update-document-req.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('documents') private documentModel: Model<DBDocument>,
    private readonly httpService: HttpService,
  ) {}

  //Create a new document
  async createDocument(
    DocumentData: CreateDocumentRequestDTO,
  ): Promise<DocumentResponseDTO> {
    try {
      let user;
      let project;

      try {
        const responses = await Promise.all([
          firstValueFrom(
            this.httpService.get(
              `http://localhost:3000/api/users/${DocumentData.userId}`,
            ),
          ).catch(() => {
            throw new UserNotFoundError();
          }),

          firstValueFrom(
            this.httpService.get(
              `http://localhost:3002/api/projects/project/${DocumentData.projectId}`,
            ),
          ).catch(() => {
            throw new ProjectNotFoundError();
          }),
        ]);

        user = responses[0].data;
        project = responses[1].data;
      } catch (error) {
        console.error(error);
      }

      const document = new this.documentModel(DocumentData);

      document.userInfo = {
        userId: user._id.toString(),
        username: user.username,
        img: user.img,
      };

      document.projectInfo = {
        projectId: project._id.toString(),
        name: project.name,
        img: project.img,
        genre: project.genre,
      };

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
  async getFeedDocuments(): Promise<DocumentResponseDTO[]> {
    const docs = await this.documentModel.find({}).exec();

    if (!docs) {
      throw new DocumentsNotFound();
    }

    const documentsWithUserAndProjectData = await Promise.all(
      docs.map(async (doc) => {
        let user;
        let project;
        try {
          const responses = await Promise.all([
            firstValueFrom(
              this.httpService.get(
                `http://localhost:3000/api/users/${doc.userInfo.userId}`,
              ),
            ),
            firstValueFrom(
              this.httpService.get(
                `http://localhost:3002/api/projects/project/${doc.projectInfo.projectId}`,
              ),
            ),
          ]);

          user = responses[0].data;
          project = responses[1].data;
        } catch (error) {
          console.error(error);
        }

        const {
          _id,
          name,
          type,
          content,
          wordCount,
          shared,
          updatedAt,
          createdAt,
        } = doc;
        return {
          _id: _id.toString(),
          userInfo: {
            userId: user._id.toString(),
            username: user.username,
            img: user.img,
          },
          projectInfo: {
            projectId: project._id.toString(),
            name: project.name,
            img: project.img,
            genre: project.genre,
          },
          name,
          type,
          content,
          wordCount,
          shared,
          updatedAt,
          createdAt,
        };
      }),
    );

    return documentsWithUserAndProjectData;
  }

  //Get all project documents
  async getAllProjectDocuments(id: string): Promise<DocumentResponseDTO[]> {
    const docs = await this.documentModel
      .find({ 'projectInfo.projectId': id })
      .exec();

    if (!docs) {
      throw new DocumentsNotFound();
    }

    const documentsWithUserAndProjectData = await Promise.all(
      docs.map(async (doc) => {
        let user;
        let project;
        try {
          const responses = await Promise.all([
            firstValueFrom(
              this.httpService.get(
                `http://localhost:3000/api/users/${doc.userInfo.userId}`,
              ),
            ),
            firstValueFrom(
              this.httpService.get(
                `http://localhost:3002/api/projects/project/${doc.projectInfo.projectId}`,
              ),
            ),
          ]);

          user = responses[0].data;
          project = responses[1].data;
        } catch (error) {
          console.error(error);
        }

        const {
          _id,
          name,
          type,
          content,
          wordCount,
          shared,
          updatedAt,
          createdAt,
        } = doc;
        return {
          _id: _id.toString(),
          userInfo: {
            userId: user._id.toString(),
            username: user.username,
            img: user.img,
          },
          projectInfo: {
            projectId: project._id.toString(),
            name: project.name,
            img: project.img,
            genre: project.genre,
          },
          name,
          type,
          content,
          wordCount,
          shared,
          updatedAt,
          createdAt,
        };
      }),
    );

    return documentsWithUserAndProjectData;
  }

  //Get a document by id
  async getDocumentById(documentId: string): Promise<DocumentResponseDTO> {
    const document = await this.documentModel.findById(documentId).exec();

    if (!document) {
      throw new DocumentNotFound();
    }

    let user;
    let project;
    try {
      const responses = await Promise.all([
        firstValueFrom(
          this.httpService.get(
            `http://localhost:3000/api/users/${document.userInfo.userId}`,
          ),
        ),
        firstValueFrom(
          this.httpService.get(
            `http://localhost:3002/api/projects/project/${document.projectInfo.projectId}`,
          ),
        ),
      ]);

      user = responses[0].data;
      project = responses[1].data;
    } catch (error) {
      console.error(error);
    }

    const documentPlainObject = document.toObject();
    const documentStringId: DocumentResponseDTO = {
      ...documentPlainObject,
      _id: document._id.toString(),
      userInfo: {
        userId: user._id.toString(),
        username: user.username,
        img: user.img,
      },
      projectInfo: {
        projectId: project._id.toString(),
        name: project.name,
        img: project.img,
        genre: project.genre,
      },
    };

    return documentStringId;
  }

  //Update a document
  async updateDocument(
    id: string,
    userData: any,
    documentData: UpdateDocumentRequestDTO,
  ): Promise<DocumentResponseDTO> {
    // Check if document exists
    const document = await this.documentModel.findById(id).exec();

    if (!document) {
      throw new DocumentNotFound();
    }

    // Check if the user is the same as the one that is logged in
    if (userData._id !== document.userInfo.userId) {
      throw new UserNotAuthorized();
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
  async deleteDocument(
    id: string,
    userData: any,
  ): Promise<DeleteDocumentResDTO> {
    // Check if project exists
    const document = await this.documentModel.findById(id).exec();
    if (!document) {
      throw new DocumentNotFound();
    }

    // Check if the user is the same as the one that is logged in
    if (userData._id !== document.userInfo.userId) {
      throw new UserNotAuthorized();
    }

    await document.remove();

    const deleteDocumentResDTO: DeleteDocumentResDTO = { _id: id };
    return deleteDocumentResDTO;
  }
}
