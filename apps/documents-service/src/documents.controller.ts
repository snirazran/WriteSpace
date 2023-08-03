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
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { ApiHeader, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import {
  DocumentNotFound,
  DocumentsNotFound,
  InvalidDetails,
  UserNotAuthorized,
  UserNotFoundError,
} from './errors';
import { JwtAuthGuard } from './jwt-auth.guard';
import { DocumentResponseDTO } from './dtos/document.dto';
import { CreateDocumentRequestDTO } from './dtos/create-document-req.dto';
import { DeleteDocumentResDTO } from './dtos/delete.document.res.dto';
import { UpdateDocumentRequestDTO } from './dtos/update-document-req.dto';
import { GetAllProjectDocumentsDTO } from './dtos/get-project-documents.dto';

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
}
