import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Projects Service')
    .setDescription('Projects Service api documentation')
    .setVersion('1.0')
    .addTag('projects-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('projectsApi', app, document);
  fs.writeFileSync('./openapi.json', JSON.stringify(document));
  await app.listen(3002);
}
bootstrap();
