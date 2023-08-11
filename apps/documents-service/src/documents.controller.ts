import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
  Delete,
  Patch,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { ApiHeader, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import {
  CommentNotFound,
  DocumentNotFound,
  DocumentsNotFound,
  InvalidDetails,
  UserNotAuthorized,
  UserNotFoundError,
} from './errors';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Comments, DocumentResponseDTO } from './dtos/document.dto';
import { CreateDocumentRequestDTO } from './dtos/create-document-req.dto';
import { DeleteDocumentResDTO } from './dtos/delete.document.res.dto';
import { UpdateDocumentRequestDTO } from './dtos/update-document-req.dto';
import { GetAllProjectDocumentsDTO } from './dtos/get-project-documents.dto';
import { CreateCommentRequestDTO } from './dtos/create-comment-req.dto';
import { DeleteCommentResDTO } from './dtos/delete-comment-res.dto';

@ApiTags('documents')
@ApiHeader({
  name: 'Documents-API',
  description: 'Documents related endpoints',
})
@Controller('/api/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  //Create a document
  @Post('/')
  @ApiResponse({ type: DocumentResponseDTO })
  async createDocument(
    @Body() DocumentData: CreateDocumentRequestDTO,
  ): Promise<DocumentResponseDTO | undefined> {
    try {
      return await this.documentsService.createDocument(DocumentData);
    } catch (e) {
      if (e instanceof InvalidDetails) {
        throw new ConflictException('Invalid details');
      }
      if (e) {
        console.log(e);
      }
    }
  }

  //Get feed documents
  @Get('/')
  @ApiResponse({ type: GetAllProjectDocumentsDTO })
  async getFeedDocuments(): Promise<GetAllProjectDocumentsDTO | undefined> {
    try {
      return {
        documents: await this.documentsService.getFeedDocuments(),
      };
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
      if (e instanceof DocumentsNotFound) {
        throw new NotFoundException();
      }
    }
  }

  //Get feed documents
  @Get('/friends/:id')
  @ApiResponse({ type: GetAllProjectDocumentsDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getFeedFriendsDocuments(
    @Param() { id }: { id: string },
  ): Promise<GetAllProjectDocumentsDTO | undefined> {
    try {
      return {
        documents: await this.documentsService.getFeedFriendsDocuments(id),
      };
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
      if (e instanceof DocumentsNotFound) {
        throw new NotFoundException();
      }
    }
  }

  //Get all project documents
  @Get('/:id')
  @ApiResponse({ type: GetAllProjectDocumentsDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the document id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getAllProjectDocuments(
    @Param() { id }: { id: string },
  ): Promise<GetAllProjectDocumentsDTO | undefined> {
    try {
      return {
        documents: await this.documentsService.getAllProjectDocuments(id),
      };
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
      if (e instanceof DocumentsNotFound) {
        throw new NotFoundException();
      }
    }
  }

  //Get all user documents
  @Get('/user/:id')
  @ApiResponse({ type: GetAllProjectDocumentsDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getAllUserDocuments(
    @Param() { id }: { id: string },
  ): Promise<GetAllProjectDocumentsDTO | undefined> {
    try {
      return {
        documents: await this.documentsService.getAllUserDocuments(id),
      };
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
      if (e instanceof DocumentsNotFound) {
        throw new NotFoundException();
      }
    }
  }

  //Get a document by id
  @Get('/document/:documentId')
  @ApiResponse({ type: DocumentResponseDTO })
  @ApiParam({
    name: 'documentId',
    required: true,
    description: 'string for the document id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getDocumentById(
    @Param() { documentId }: { documentId: string },
  ): Promise<DocumentResponseDTO | undefined> {
    try {
      return await this.documentsService.getDocumentById(documentId);
    } catch (e) {
      if (e instanceof DocumentNotFound) {
        throw new NotFoundException();
      }
    }
  }

  //Update a document
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiResponse({ type: DocumentResponseDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the document id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async updateDocument(
    @Param('id') id: string,
    @Request() req: any, // change to specific type
    @Body() documentData: UpdateDocumentRequestDTO,
  ): Promise<DocumentResponseDTO | undefined> {
    // Update user
    try {
      return await this.documentsService.updateDocument(
        id,
        req.user,
        documentData,
      );
    } catch (e) {
      if (e instanceof DocumentNotFound) {
        throw new NotFoundException();
      }
      if (e instanceof UserNotAuthorized) {
        throw new UnauthorizedException();
      }
    }
  }

  //Delete a document
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiResponse({ type: DeleteDocumentResDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the project id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async deleteDocument(
    @Param('id') id: string,
    @Request() req: any, // change to specific type
  ): Promise<DeleteDocumentResDTO | undefined> {
    // delete Document
    try {
      return await this.documentsService.deleteDocument(id, req.user);
    } catch (e) {
      if (e instanceof DocumentNotFound) {
        throw new NotFoundException();
      }
      if (e instanceof UserNotAuthorized) {
        throw new UnauthorizedException();
      }
    }
  }

  //Add remove like
  @Patch('/document/like/:documentId/:userId')
  @ApiResponse({ type: DocumentResponseDTO })
  @ApiParam({
    name: 'documentId',
    required: true,
    description: 'string for the document id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async addRemoveLike(
    @Param() { documentId }: { documentId: string },
    @Param() { userId }: { userId: string },
  ): Promise<DocumentResponseDTO | undefined> {
    try {
      return await this.documentsService.addRemoveLike(documentId, userId);
    } catch (e) {
      if (e instanceof DocumentNotFound) {
        throw new NotFoundException();
      }
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  //Add comment
  @Post('/document/comment/:userId')
  @ApiResponse({ type: DocumentResponseDTO })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async addComment(
    @Param() { userId }: { userId: string },
    @Body() content: CreateCommentRequestDTO,
  ): Promise<DocumentResponseDTO | undefined> {
    try {
      return await this.documentsService.addComment(userId, content);
    } catch (e) {
      if (e instanceof DocumentNotFound) {
        throw new NotFoundException();
      }
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  //Delete comment
  @Delete('/document/comment/delete/:userId/:documentId/:commentId')
  @ApiResponse({ type: DeleteCommentResDTO })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @ApiParam({
    name: 'documentId',
    required: true,
    description: 'string for the document id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: 'string for the comment id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async deleteComment(
    @Param() { userId }: { userId: string },
    @Param() { documentId }: { documentId: string },
    @Param() { commentId }: { commentId: string },
  ): Promise<DeleteCommentResDTO | undefined> {
    // delete Comment
    try {
      return await this.documentsService.deleteComment(
        userId,
        documentId,
        commentId,
      );
    } catch (e) {
      if (e instanceof DocumentNotFound) {
        throw new NotFoundException();
      }
      if (e instanceof UserNotAuthorized) {
        throw new UnauthorizedException();
      }
      if (e instanceof CommentNotFound) {
        throw new NotFoundException();
      }
    }
  }
}
