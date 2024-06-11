import { instance } from "@/axios/instance"
import { User } from "@backend/users/schemas/user.schema"

export const UserService = {
  getUsers: () =>
    instance.get<User[]>('/users')

}
