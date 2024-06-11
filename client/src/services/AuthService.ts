import { instance } from "@/axios/instance"
import { CreateDeckDto } from "@backend/decks/dto/create-deck.dto"
import { UpdateDeckDto } from "@backend/decks/dto/update-deck.dto";

export const AuthService = {
  login: (data: { email: string, password: string }) => instance.post('/auth/login', data),
}
