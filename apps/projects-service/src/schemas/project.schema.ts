import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IProject } from 'src/types/project';

export type UserDocument = HydratedDocument<IProject>;

@Schema({ timestamps: true })
export class DBProject {
  @Prop({ type: Types.ObjectId, ref: 'DBUser' })
  userId: Types.ObjectId;

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
