import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
  });
  const config = new DocumentBuilder()
    .setTitle('Documents Service')
    .setDescription('Documents Service api documentation')
    .setVersion('1.0')
    .addTag('documents-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentsApi', app, document);
  fs.writeFileSync('./openapi.json', JSON.stringify(document));
  await app.listen(process.env.DOCUMENTS_PORT || 3003, '0.0.0.0');
}
bootstrap();
