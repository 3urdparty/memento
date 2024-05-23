import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Factory } from 'nestjs-seeder'
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class User {
  // @Factory((faker) => faker.person)
  @Factory((faker) => faker.person.fullName())
  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
