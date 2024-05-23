// src/schemas/menu.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Property } from 'client/src/views/decks/Index.vue';
import { Document } from 'mongoose';
import { Flashcard, Tag } from 'src/flashcards/schemas/flashcard.schema';
import { User } from 'src/users/schemas/user.schema';

export type DeckDocument = Deck & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Deck {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  difficulty: string;

  @Prop({ required: true })
  coverUrl: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  new: number;

  @Prop({ required: true })
  due: number;

  @Prop({ required: true })
  leech: number;

  @Prop({ required: true })
  suspended: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  recentStudents: number;

  @Prop({ required: true })
  properties: Property[];

  @Prop({ required: true })
  contributors: User[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  tags: Tag[];

  @Prop({ required: true })
  flashcards: Flashcard[];
}


export const DeckSchema = SchemaFactory.createForClass(Deck)
