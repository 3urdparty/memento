import { instance } from "@/axios/instance"
import { CreateDeckDto } from "@backend/decks/dto/create-deck.dto"
import { UpdateDrawerDto } from "@backend/drawers/dto/update-drawer.dto";

export const DecksService = {
  updateDrawer: () => instance.get('/drawers'),
  updateDeck: (drawer: UpdateDrawerDto) => instance.put(`/drawers/${drawer.slug}`, drawer),
  createDrawer: (data: CreateDeckDto) => instance
    .postForm('/decks', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
}
