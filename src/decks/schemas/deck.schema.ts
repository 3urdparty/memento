// src/schemas/menu.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import { Flashcard, Tag } from 'src/flashcards/schemas/flashcard.schema';
import { User } from 'src/users/schemas/user.schema';
import { Property } from '../entities/deck.entity';
import { Factory } from 'nestjs-seeder';

export type DeckDocument = Deck & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
  toJSON: {
    getters: true,
    virtuals: true,
  },
  virtuals: true,

})
export class Deck {

  @Factory(faker => faker.lorem.slug(12))
  @Prop({ required: true })
  slug: string;

  @Factory((faker) => faker.helpers.arrayElement(['easy', 'medium', 'hard', 'very hard', 'expert']))
  @Prop({ required: true, enum: ['easy', 'medium', 'hard', 'very hard', 'expert'] })
  difficulty: string;

  @Factory(faker => faker.image.url())
  @Prop({ required: true })
  coverUrl: string;

  @Prop({ virtual: true, get: function() { return this.cards.length }, required: false })
  total: number;

  @Prop({ virtual: true, get: function() { return this.cards.length }, required: false })
  new: number;

  @Prop({ virtual: true, get: function() { return this.cards.length }, omit: 'due' })
  due: number;

  @Prop({ virtual: 'leech', get: function() { return this.cards.length }, })
  leech: number;

  @Prop({ virtual: true, get: function() { return this.cards.length } })
  suspended: number;

  @Factory(faker => faker.number.int({ min: 0, max: 5 }))
  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ virtual: true, get: function() { return [] }, omit: 'recentStudents' })
  recentStudents: number;

  @Factory(() => [])
  @Prop({ required: true })
  properties: Property[];

  @Factory(() => [])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  contributors: User[];

  @Factory(faker => faker.lorem.words(4))
  @Prop({ required: true })
  name: string;

  @Factory(faker => faker.lorem.paragraph())
  @Prop({ required: true })
  description: string;

  @Factory(() => [])
  @Prop({ required: true })
  tags: Tag[];

  @Factory(() => [])
  @Prop({ required: true })
  flashcards: Flashcard[];
}


export const DeckSchema = SchemaFactory.createForClass(Deck).omit(['total', 'due'])
