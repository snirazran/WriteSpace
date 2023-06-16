import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IDocument } from 'src/types/document';

export type DocumentsDocument = HydratedDocument<IDocument>;

@Schema({ timestamps: true })
export class DBDocument {
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
