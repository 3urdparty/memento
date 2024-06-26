import { instance } from "@/axios/instance"
import { CreateCardDto } from "@backend/cards/dto/create-card.dto";
import { CreateDeckDto } from "@backend/decks/dto/create-deck.dto"
import { UpdateDeckDto } from "@backend/decks/dto/update-deck.dto";

export const DecksService = {
  getDeckBySlug: (slug: string) => instance.get(`/decks/${slug}`),
  updateDeck: (deck: UpdateDeckDto) => instance.put(`/decks/${deck._id}`, deck),
  createDeck: (data: CreateDeckDto) => instance
    .postForm('/decks', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  deleteDeck: (id: string) => instance.delete(`/decks/${id}`),
  createCard: (deckId: string, card: CreateCardDto) => instance.post(`/decks/${deckId}/cards`, card),
}
