import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { IUser } from 'src/types/user';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<IUser>;

@Schema({ timestamps: true })
export class DBUser implements IUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId || String })
  _id: ObjectId | string;

  @Prop({ type: String, required: true, minlength: 2, maxlength: 20 })
  username: string;

  @Prop({ type: String, required: true, maxlength: 40 })
  email: string;

  @Prop({
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    select: false,
  })
  password: string;

  @Prop({ type: Array, default: [] })
  friends: Array<string>;

  @Prop({ type: String, default: '', maxlength: 200 })
  bio: string;

  @Prop({ type: String, default: '', maxlength: 100 })
  img: string;

  @Prop({ type: String })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(DBUser);
