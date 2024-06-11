import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { Deck } from 'src/decks/schemas/deck.schema';

export type CardDocument = Card & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class Card {
  @Factory((faker) => faker.word.words(5))
  @Prop({ required: true })
  question: string;

  @Prop({ required: false, default: [] })
  tags: Tag[];

  @Prop({ required: false })
  decks: Deck[];

  @Prop({ required: false, default: "short-answer", enum: ["multiple-choice", "true-false", "fill-in-the-blank", "short-answer", "matching", "essay", "diagram", "card", "steps"] })
  type: "multiple-choice" | "true-false" | "fill-in-the-blank" | "short-answer" | "matching" | "essay" | "diagram" | "card" | "steps";

  @Prop({ required: false })
  level: string;

  @Prop({ required: false })
  options: MultipleChoiceOption[];

  @Prop({ required: true })
  answer: string;
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



