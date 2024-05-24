import { Deck } from "src/decks/schemas/deck.schema";
import { Tag } from "src/flashcards/schemas/flashcard.schema";

export interface Drawer {
  icon: string;
  name: string;
  description: string;
  tags: Tag[];
  decks?: Deck[];
  vaultUrl?: string;
}


