import { Property } from "client/src/views/decks/Index.vue";
import { User } from "src/users/schemas/user.schema";

export interface Deck {
  name: string;
  slug: string;
  description: string;
  drawers?: string[];
  flashcards?: string[];
  difficulty?: "easy" | "medium" | "hard" | "very hard" | "expert"
  total: number;
  new: number;
  due: number;
  leech: number;
  suspended: number;
  contributors: User[];
  owner: User;
  coverUrl?: string;
  properties: Property[];
}


