import { Deck } from "src/decks/schemas/deck.schema";
import { Tag } from "src/cards/schemas/card.schema";

export interface Drawer {
  icon: string;
  name: string;
  description: string;
  tags: Tag[];
  decks?: Deck[];
  vaultUrl?: string;
}


