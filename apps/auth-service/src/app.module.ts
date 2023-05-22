import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SwaggerModule } from '@nestjs/swagger';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './schemas/user.schema';
import { config } from 'dotenv';

config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    SwaggerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
