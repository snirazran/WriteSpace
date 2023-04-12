import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, minlength: 2, maxlength: 20 })
  username: string;

  @Prop({ type: String, required: true, maxlength: 40 })
  email: string;

  @Prop({ type: String, required: true, minlength: 6, maxlength: 20 })
  password: string;

  @Prop({ type: Array, default: [] })
  friends: Array<string>;

  @Prop({ type: String, default: '', maxlength: 200 })
  bio: string;

  @Prop({ type: String, default: '', maxlength: 100 })
  img: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
