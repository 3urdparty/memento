import { instance } from "@/axios/instance"

export const UserService = {
  getUsers: () =>
    instance.get('/users')

}
