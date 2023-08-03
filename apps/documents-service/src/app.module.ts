import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentSchema } from './schemas/document.schema';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { OpenAiService } from './OpenAi.service';

config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    MongooseModule.forFeature([{ name: 'documents', schema: DocumentSchema }]),
    SwaggerModule,
    PassportModule,
    HttpModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, JwtStrategy, OpenAiService],
})
export class AppModule {}
