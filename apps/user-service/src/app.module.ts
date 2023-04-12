import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { FriendController } from './friends.controller';
import { UserService } from './user.service';
import { FriendsService } from './friends.service';

config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
  ],
  controllers: [UserController, FriendController],
  providers: [UserService, FriendsService],
})
export class AppModule {}
