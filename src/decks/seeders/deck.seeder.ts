
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";
import { Deck } from "../schemas/deck.schema";
import { faker } from "@faker-js/faker";
import { User } from "src/users/schemas/user.schema";
import { ObjectId } from "mongodb";

@Injectable()
export class DecksSeeder implements Seeder {
  constructor(@InjectModel(Deck.name) private readonly deck: Model<Deck>,
  ) { }

  async seed(): Promise<any> {
    const decks = DataFactory.createForClass(Deck).generate(10, {
    }).map(deck => {
      const users = DataFactory.createForClass(User).generate(10).map(user => ({ ...user, _id: new ObjectId() }))
      return ({
        ...deck,
        contributors: users.map(user => user._id)
      })
    });

    return this.deck.insertMany(decks)
  }

  async drop(): Promise<any> {
    return this.deck.deleteMany({});
  }
}
