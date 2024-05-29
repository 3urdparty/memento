import mongoose from "mongoose";
import { Deck } from "../schemas/deck.schema";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsEmpty, IsMongoId } from "class-validator";
import { Transform } from "class-transformer";

export class CreateDeckDto {
  difficulty: string;
  coverUrl: string;
  rating: number;
  properties: mongoose.Schema.Types.ObjectId[];

  contributors: mongoose.Schema.Types.ObjectId[];
  name: string;
  description: string;
  // tags: Tag[];
  cards: mongoose.Schema.Types.ObjectId[];
}
