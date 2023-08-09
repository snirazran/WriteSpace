import { Injectable } from '@nestjs/common';
import { DBUser } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotFoundError, UsersNotFoundError } from './errors';
import { HttpService } from '@nestjs/axios';
import { UserResponseDTO } from './dtos/user-response.dto';
import { GetUserLikesDTO } from './dtos/get-user-likes-res.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private userModel: Model<DBUser>,
    private readonly httpService: HttpService,
  ) {}

  //Get All Users
  async getAllUsers(): Promise<UserResponseDTO[]> {
    const docs = await this.userModel.find({}).exec();

    if (!docs) {
      throw new UsersNotFoundError();
    }

    const filteredUsers = docs.map((obj) => {
      const { _id, username, email, friends, bio, img } = obj;
      const user = {
        _id: _id.toString(), // Convert ObjectId to string
        username,
        email,
        friends,
        bio,
        img,
      };
      return user;
    });

    return filteredUsers;
  }

  //Get User by Id
  async getUserById(id: string): Promise<UserResponseDTO> {
    const doc = await this.userModel.findById(id).exec();

    if (!doc) {
      throw new UserNotFoundError();
    }

    const userPlainObject = doc.toObject();
    const userStringId: UserResponseDTO = {
      ...userPlainObject,
      _id: doc._id.toString(),
    };

    return userStringId;
  }

  async getUserLikes(id: string): Promise<GetUserLikesDTO> {
    const doc = await this.userModel.findById(id).exec();

    if (!doc) {
      throw new UserNotFoundError();
    }

    let documents;
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `http://localhost:3003/api/documents/user/${doc.id}`,
        ),
      );
      documents = response.data.documents;
    } catch (error) {
      throw new UserNotFoundError();
    }

    let totalLikes = 0;

    for (const document of documents) {
      const likesArray = document.likes;
      for (const like of likesArray) {
        totalLikes += 1;
      }
    }

    return { totalLikes };
  }
}
