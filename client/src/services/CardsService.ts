import { instance } from "@/axios/instance"
import { CreateCardDto } from "@backend/cards/dto/create-card.dto"
import { UpdateCardDto } from "@backend/cards/dto/update-card.dto"

export const CardsService = {
  getCardBySlug: (slug: string) => instance.get(`/cards/${slug}`),
  updateCard: (card: UpdateCardDto) => instance.put(`/cards/${card.slug}`, card),
  createCard: (data: CreateCardDto) => instance
    .postForm('/cards', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  deleteDeck: (id: string) => instance.delete(`/decks/${id}`),
}
