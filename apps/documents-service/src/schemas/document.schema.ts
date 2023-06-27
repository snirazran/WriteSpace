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

  @Prop({ type: ProjectInfo, ref: 'DBProject' })
  projectInfo: ProjectInfo;

  @Prop({ type: Types.ObjectId, ref: 'DBUser' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'DBProject' })
  projectId: Types.ObjectId;

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
}

export const DocumentSchema = SchemaFactory.createForClass(DBDocument);
