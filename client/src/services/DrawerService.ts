import { instance } from "@/axios/instance"

export const DrawerService = {
  getDrawers: () =>
    instance.get('/drawers')

}
