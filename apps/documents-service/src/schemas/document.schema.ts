import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IDocument } from 'src/types/document';

export type DocumentsDocument = HydratedDocument<IDocument>;

class UserInfo {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  img: string;
}

@Schema()
class Comments {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  commentContent: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);

@Schema()
class Likes {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  id: string;
}

export const LikesSchema = SchemaFactory.createForClass(Likes);

class ProjectInfo {
  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  genre: string;
}

@Schema({ timestamps: true })
export class DBDocument {
  @Prop({ type: UserInfo, ref: 'DBUser' })
  userInfo: UserInfo;

  @Prop({ type: UserInfo, ref: 'DBProject' })
  projectInfo: ProjectInfo;

  @Prop({ type: String, maxlength: 30 })
  name: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, default: '' })
  content: string;

  @Prop({ type: Number, default: 0 })
  wordCount: number;

  @Prop({ type: Boolean, default: true })
  shared: boolean;

  @Prop({ type: [CommentsSchema], default: [] })
  comments: Types.Array<Comments>;

  @Prop({ type: [LikesSchema], default: [] })
  likes: Types.Array<Likes>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const DocumentSchema = SchemaFactory.createForClass(DBDocument);
