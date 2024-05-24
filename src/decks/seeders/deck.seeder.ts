
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";
import { Deck } from "../schemas/deck.schema";

@Injectable()
export class DecksSeeder implements Seeder {
  constructor(@InjectModel(Deck.name) private readonly deck: Model<Deck>) { }

  async seed(): Promise<any> {
    // Generate 10 decks.
    const decks = DataFactory.createForClass(Deck).generate(10);


    return this.deck.insertMany(decks);
  }

  async drop(): Promise<any> {
    return this.deck.deleteMany({});
  }
}
