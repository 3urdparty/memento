import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './schemas/deck.schema';
import { Model } from 'mongoose';
import { CreateDeckDto } from './dto/create-deck.dto';
import { Drawer } from 'src/drawers/schema/drawer.schema';

@Injectable()
export class DecksService {
  constructor(@InjectModel(Deck.name) private readonly deckModel: Model<Deck>,
    @InjectModel(Drawer.name) private readonly drawerModel: Model<Drawer>) { }

  async findAll(): Promise<Deck[]> {
    return await this.deckModel.find().populate('cards').exec();
  }

  async findOne(id: string): Promise<Deck> {
    return await this.deckModel.findById(id).exec();
  }

  async create(deck: CreateDeckDto): Promise<Deck> {
    const newDeck = new this.deckModel(deck);
    console.log(newDeck);
    const drawer = (await this.drawerModel.find().exec())[0]
    //@ts-ignore

    drawer.decks.push(newDeck._id);
    await drawer.save();
    return await newDeck.save();
  }

  async update(id: string, deck: Deck): Promise<Deck> {
    return await this.deckModel.findByIdAndUpdate(id, deck, { new: true });
  }

  async delete(id: string): Promise<Deck> {
    return await this.deckModel.findByIdAndDelete(id);
  }
}
