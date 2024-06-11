import { Deck } from "src/decks/schemas/deck.schema";

export interface Card {
  number: number;
  question: string;
  tags?: Tag[];
  decks?: Deck[];
  type:
  | 'Multiple Choice'
  | 'True/False'
  | 'Fill in the Blank'
  | 'Short Answer'
  | 'Matching'
  | 'Essay'
  | 'Diagram'
  | 'Card'
  | 'Steps';
  level?: string;
  callout?: string;
  options?: MultipleChoiceOption[];
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

