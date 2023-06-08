import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SwaggerModule } from '@nestjs/swagger';
import { ProjectSchema } from './schemas/project.schema';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    MongooseModule.forFeature([{ name: 'projects', schema: ProjectSchema }]),
    SwaggerModule,
    PassportModule,
    HttpModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, JwtStrategy],
})
export class AppModule {}
