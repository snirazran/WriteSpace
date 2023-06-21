import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IProject } from 'src/types/project';

export type ProjectDocument = HydratedDocument<IProject>;

class UserInfo {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  img: string;
}

@Schema({ timestamps: true })
export class DBProject {
  @Prop({ type: UserInfo, ref: 'DBUser' })
  userInfo: UserInfo;

  @Prop({ type: String, minlength: 2, maxlength: 30 })
  name: string;

  @Prop({ type: String })
  img: string;

  @Prop({ type: String, required: true })
  genre: string;

  @Prop({ type: String, default: '', maxlength: 300 })
  description: string;

  @Prop({ type: Boolean, default: true })
  shared: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(DBProject);
