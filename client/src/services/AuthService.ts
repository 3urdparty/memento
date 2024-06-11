import { instance } from "@/axios/instance"
import { LoginDto } from "@backend/auth/dto/login.dto"

export const AuthService = {
  login: (data: LoginDto) => instance.post('/auth/login', data),
}
