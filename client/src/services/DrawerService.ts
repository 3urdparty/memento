import { instance } from "@/axios/instance"
import { CreateDrawerDto } from "@backend/drawers/dto/create-drawer.dto"
import { Drawer } from "@backend/drawers/schema/drawer.schema"
import { warn } from "console"

export const DrawerService = {
  getDrawers: () =>
    instance.get('/drawers'),
  updateDrawer: (drawer: Drawer) =>
    instance.put(`/drawers/${drawer.slug}`, drawer),
  createDrawer: (drawer: CreateDrawerDto) =>
    instance.post('/drawers', drawer),
  deleteDrawer: (drawer: Drawer) =>
    instance.delete(`/drawers/${drawer.slug}`)

}
