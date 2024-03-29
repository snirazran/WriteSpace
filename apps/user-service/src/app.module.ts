import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { FriendController } from './friends.controller';
import { UserService } from './user.service';
import { FriendsService } from './friends.service';
import { UserSchema } from './schemas/user.schema';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpModule } from '@nestjs/axios';

config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    SwaggerModule,
    HttpModule,
  ],

  controllers: [UserController, FriendController],
  providers: [UserService, FriendsService],
  exports: [UserService],
})
export class AppModule {}
