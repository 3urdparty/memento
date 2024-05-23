import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { Deck } from 'src/decks/schemas/deck.schema';

export type FlashcardDocument = Flashcard & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class Flashcard {
  @Factory((faker) => faker.word.words(5))
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  tags: Tag[];

  @Prop({ required: true })
  decks: Deck[];

  @Prop({ required: true, enum: ['Multiple Choice', 'True/False', 'Fill in the Blank', 'Short Answer', 'Matching', 'Essay', 'Diagram', 'Flashcard', 'Steps'] })
  type: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  callout: string;

  @Prop({ required: true })
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


export const FlashcardSchema = SchemaFactory.createForClass(Flashcard)



