import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Drawer } from "../schema/drawer.schema";
import { ObjectId } from "mongoose";

export class CreateDrawerDto extends PartialType(OmitType(Drawer, ['decks']))
{
  decks: ObjectId[];
}
