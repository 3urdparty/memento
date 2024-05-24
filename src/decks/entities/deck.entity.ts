import { User } from "src/users/schemas/user.schema";


export interface Property {
  name: string;
  value: string;
  type:
  | 'text'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime'
  | 'color'
  | 'range'
  | 'file'
  | 'checkbox'
  | 'select';
}

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


