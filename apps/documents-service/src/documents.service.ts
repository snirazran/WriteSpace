import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DBDocument } from './schemas/document.schema';
import {
  CommentNotFound,
  DocumentNotFound,
  DocumentsNotFound,
  InvalidDetails,
  ProjectNotFoundError,
  UserNotAuthorized,
  UserNotFoundError,
} from './errors';
import { Comments, DocumentResponseDTO } from './dtos/document.dto';
import { CreateDocumentRequestDTO } from './dtos/create-document-req.dto';
import { DeleteDocumentResDTO } from './dtos/delete.document.res.dto';
import { UpdateDocumentRequestDTO } from './dtos/update-document-req.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { docName } from './utils/docName';
import { docContent } from './utils/docContent';
import { OpenAiService } from './OpenAi.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateCommentRequestDTO } from './dtos/create-comment-req.dto';
import { DeleteCommentResDTO } from './dtos/delete-comment-res.dto';
import * as process from 'process';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('documents') private documentModel: Model<DBDocument>,
    private readonly httpService: HttpService,
    private openAiService: OpenAiService,
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
              `${process.env.USERS_SERVICE_URL}/api/users/${DocumentData.userId}`,
            ),
          ).catch(() => {
            throw new UserNotFoundError();
          }),

          firstValueFrom(
            this.httpService.get(
              `${process.env.PROJECTS_SERVICE_URL}/api/projects/project/${DocumentData.projectId}`,
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
      const openingSentence = await docContent(
        project.genre,
        this.openAiService.getConfiguration(),
      );
      const document = new this.documentModel(DocumentData);

      document.content = openingSentence;

      document.name = docName(project.genre);

      document.shared = true;

      document.userInfo = {
        userId: user?._id.toString(),
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

  //Get all feed  documents
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
                `${process.env.USERS_SERVICE_URL}/api/users/${doc.userInfo.userId}`,
              ),
            ),
            firstValueFrom(
              this.httpService.get(
                `${process.env.PROJECTS_SERVICE_URL}/api/projects/project/${doc.projectInfo.projectId}`,
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
          likes,
          comments,
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
          likes,
          comments,
          updatedAt,
          createdAt,
        };
      }),
    );

    const filteredDocuments = documentsWithUserAndProjectData.filter(
      (doc) => doc.shared !== false,
    );

    return filteredDocuments;
  }

  //Get all friends feed documents
  async getFeedFriendsDocuments(id: string): Promise<DocumentResponseDTO[]> {
    let friends;

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.USERS_SERVICE_URL}/api/friends/${id}`,
        ),
      );
      friends = response.data;
    } catch (error) {
      console.error(error);
    }

    const friendsDocs = await Promise.all(
      friends.userFriends.map(async (friend: any) => {
        const docs = await this.documentModel
          .find({ 'userInfo.userId': friend._id })
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
                    `${process.env.USERS_SERVICE_URL}/api/users/${doc.userInfo.userId}`,
                  ),
                ),
                firstValueFrom(
                  this.httpService.get(
                    `${process.env.PROJECTS_SERVICE_URL}/api/projects/project/${doc.projectInfo.projectId}`,
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
              likes,
              comments,
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
              likes,
              comments,
              updatedAt,
              createdAt,
            };
          }),
        );

        return documentsWithUserAndProjectData;
      }),
    );
    const filteredResult = friendsDocs
      .reduce((acc, curr) => acc.concat(curr), [])
      .filter((item: any) => Object.keys(item).length > 0);

    const filteredDocuments = filteredResult.filter(
      (doc: any) => doc.shared !== false,
    );
    return filteredDocuments;
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
                `${process.env.USERS_SERVICE_URL}/api/users/${doc.userInfo.userId}`,
              ),
            ),
            firstValueFrom(
              this.httpService.get(
                `${process.env.PROJECTS_SERVICE_URL}/api/projects/project/${doc.projectInfo.projectId}`,
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
          likes,
          comments,
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
          likes,
          comments,
          updatedAt,
          createdAt,
        };
      }),
    );

    return documentsWithUserAndProjectData;
  }

  //Get all user documents
  async getAllUserDocuments(id: string): Promise<DocumentResponseDTO[]> {
    const docs = await this.documentModel
      .find({ 'userInfo.userId': id })
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
                `${process.env.USERS_SERVICE_URL}/api/users/${doc.userInfo.userId}`,
              ),
            ),
            firstValueFrom(
              this.httpService.get(
                `${process.env.PROJECTS_SERVICE_URL}/api/projects/project/${doc.projectInfo.projectId}`,
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
          likes,
          comments,
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
          likes,
          comments,
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
            `${process.env.USERS_SERVICE_URL}/api/users/${document.userInfo.userId}`,
          ),
        ),
        firstValueFrom(
          this.httpService.get(
            `${process.env.PROJECTS_SERVICE_URL}/api/projects/project/${document.projectInfo.projectId}`,
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
    // Check if document exists
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

  //Add Remove like
  async addRemoveLike(
    documentId: string,
    userId: string,
  ): Promise<DocumentResponseDTO> {
    // Check if document exists
    const document = await this.documentModel.findById(documentId).exec();
    if (!document) {
      throw new DocumentNotFound();
    }

    // Check if user exists
    const user = await firstValueFrom(
      this.httpService.get(
        `${process.env.USERS_SERVICE_URL}/api/users/${userId}`,
      ),
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    if (document.likes.some((like) => like.id === userId)) {
      document.likes.pull({ id: userId });
    } else {
      document.likes.push({
        username: user.data.username,
        img: user.data.img,
        id: user.data._id,
      });
    }

    await document.save();

    const documentPlainObject = document.toObject();
    const documentStringId: DocumentResponseDTO = {
      ...documentPlainObject,
      _id: document._id.toString(),
    };

    return documentStringId;
  }

  //Add Remove comment
  async addComment(
    userId: string,
    content: CreateCommentRequestDTO,
  ): Promise<DocumentResponseDTO> {
    // Check if document exists
    const document = await this.documentModel
      .findById(content.documentId)
      .exec();
    if (!document) {
      throw new DocumentNotFound();
    }

    // Check if user exists
    const user = await firstValueFrom(
      this.httpService.get(
        `${process.env.USERS_SERVICE_URL}/api/users/${userId}`,
      ),
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    document.comments.push({
      id: uuidv4(),
      username: user.data.username,
      img: user.data.img,
      userId: user.data._id,
      commentContent: content.content,
    });

    await document.save();

    const documentPlainObject = document.toObject();
    const documentStringId: DocumentResponseDTO = {
      ...documentPlainObject,
      _id: document._id.toString(),
    };

    return documentStringId;
  }

  //Delete a comment
  async deleteComment(
    userId: string,
    documentId: string,
    commentId: string,
  ): Promise<DeleteCommentResDTO> {
    // Check if document exists
    const document = await this.documentModel.findById(documentId).exec();
    if (!document) {
      throw new DocumentNotFound();
    }
    console.log(commentId);
    console.log(document);
    const comment = document.comments.find(
      (comment) => comment.id === commentId,
    );

    console.log(comment);

    if (!comment) {
      throw new CommentNotFound();
    }

    if (comment.userId !== userId) {
      throw new UserNotAuthorized();
    }

    document.comments.pull({ id: commentId });

    await document.save();

    const deleteCommentResDTO: DeleteCommentResDTO = { commentId: commentId };
    return deleteCommentResDTO;
  }
}
