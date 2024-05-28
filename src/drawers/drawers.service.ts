import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drawer } from './schema/drawer.schema';
import { Deck } from 'src/decks/schemas/deck.schema';

@Injectable()
export class DrawersService {
  constructor(@InjectModel(Drawer.name) private readonly drawerModel: Model<Drawer>,
  ) { }

  async findAll(): Promise<Drawer[]> {
    return await this.drawerModel.find().populate('decks', null, Deck.name).exec();
  }

  async findOne(id: string): Promise<Drawer> {
    return await this.drawerModel.findById(id).exec();
  }

  async create(drawer: Drawer): Promise<Drawer> {
    const newDrawer = new this.drawerModel(drawer);
    return await newDrawer.save();
  }

  async update(id: string, drawer: Drawer): Promise<Drawer> {
    return await this.drawerModel.findByIdAndUpdate(id, drawer, { new: true });
  }

  async delete(id: string): Promise<Drawer> {
    return await this.drawerModel.findByIdAndDelete(id);
  }
}
