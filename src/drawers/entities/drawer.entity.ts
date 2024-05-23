
export interface Drawer {
  icon: string;
  name: string;
  description: string;
  tags: Tag[];
  decks?: App.Models.Deck[];
  vaultUrl?: string;
}


