import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { Deck } from 'src/decks/schemas/deck.schema';
import { CreateCardDto } from '../dto/create-card.dto';

export const cardTypes = ["multiple-choice", "true-false", "cloze", "short-answer", "matching", "essay", "diagram", "card", "steps"]

export type MCQOption = {
  key: string;
  name: string;
  correct: boolean;
  explanation?: string;
};

export type ClozeSegment = {
  value: string;
  type: 'cloze' | 'text';
}

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
  toJSON: {
    getters: true,
    virtuals: true,
  },
})

export class Card {
  @Factory((faker) => faker.word.words(5))
  @Prop({ required: false, })
  question: string;

  @Prop({ required: false, default: [] })
  tags: Tag[];

  @Prop({ required: false })
  decks: Deck[];

  @Prop({ required: false, default: "short-answer", enum: cardTypes, type: String })
  type: typeof cardTypes[number];

  @Prop({ required: false })
  level: string;

  @Prop({ required: false })
  options: MultipleChoiceOption[];

  @Prop({ required: false })
  answer: string;

  @Prop({ virtual: true, get: function() { return null } })
  callout: string

  @Prop({ required: false })
  clozeSegments: ClozeSegment[];
}

export interface MultipleChoiceOption {
  value: string;
  isCorrect: boolean;
  imgPath: string;
}

export interface Tag {
  name: string;
  color: string;
}

export const CardSchema = SchemaFactory.createForClass(Card)

export type CardDocument = Card & { _id: string };

