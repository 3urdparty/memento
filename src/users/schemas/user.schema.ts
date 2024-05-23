import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//@ts-ignore
import { Factory } from 'nestjs-seeder';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})


export class User {
  @Factory((faker) => faker.person.fullName())
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: false })
  email_verified_at?: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
