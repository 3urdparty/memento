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

  @Factory(faker => faker.internet.password())
  @Prop({ required: true, unique: true })
  email: string;

  @Factory(faker => faker.image.url())
  @Prop({ required: false })
  imageUrl?: string;

  @Factory(faker => faker.date.soon())
  @Prop({ required: false })
  email_verified_at?: string;

  @Factory(faker => faker.internet.password())
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
