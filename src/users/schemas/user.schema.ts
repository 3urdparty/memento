import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//@ts-ignore
import { DataFactory, Factory } from 'nestjs-seeder';
import { Avatar } from '../entities/user.entity';
import { AvatarFactory } from '../entities/factories/avatar.factory';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class Notification {
  @Factory(faker => faker.lorem.sentence())
  @Prop({ required: true })
  message: string;


  @Factory(faker => faker.datatype.boolean())
  @Prop({ required: true })
  read: boolean;
}

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
  // toJSON: {
  //   virtuals: true
  // },
  // toObject: {
  //   virtuals: true
  // }
})

export class User {
  @Factory((faker) => faker.person.fullName())
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  verified: boolean;

  @Factory((faker, ctx) => ctx.email ?? faker.internet.email())
  @Prop({ required: true })
  email: string;

  @Factory((faker) => faker.image.url())
  @Prop({ required: false })
  imageUrl?: string;

  @Factory(faker => faker.date.soon())
  @Prop({ required: false })
  email_verified_at?: string;

  @Factory((faker, ctx) => ctx.password ?? faker.internet.password())
  @Prop({ required: true })
  password: string;

  @Factory(AvatarFactory)
  @Prop({ required: false })
  avatar: Avatar;

  @Factory(() => DataFactory.createForClass(Notification).generate(5))
  @Prop({ default: [], required: true })
  notifications: Notification[];

}

export const UserSchema = SchemaFactory.createForClass(User)
