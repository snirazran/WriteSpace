import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('User Service api documentation')
    .setVersion('1.0')
    .addTag('user-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  fs.writeFileSync('./openapi.json', JSON.stringify(document));
  await app.listen(3000);
}
bootstrap();
