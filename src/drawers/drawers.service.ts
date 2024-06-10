import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drawer } from './schema/drawer.schema';
import { Deck } from 'src/decks/schemas/deck.schema';
import { UpdateDrawerDto } from './dto/update-drawer.dto';
import { CreateDrawerDto } from './dto/create-drawer.dto';

@Injectable()
export class DrawersService {
  constructor(@InjectModel(Drawer.name) private readonly drawerModel: Model<Drawer>,
  ) { }

  async findAll(): Promise<Drawer[]> {
    return await this.drawerModel.find().populate({ path: 'decks', populate: { path: 'contributors' } }).exec();
  }

  async findOne(id: string): Promise<Drawer> {
    return await this.drawerModel.findById(id).exec();
  }

  async create(drawer: CreateDrawerDto): Promise<Drawer> {
    const newDrawer = new this.drawerModel(drawer);
    return await newDrawer.save();
  }

  async update(id: string, drawer: UpdateDrawerDto): Promise<Drawer> {
    return await this.drawerModel.findByIdAndUpdate(id, drawer, { new: true });
  }

  async delete(id: string): Promise<Drawer> {
    return await this.drawerModel.findByIdAndDelete(id);
  }

  async deleteBySlug(slug: string): Promise<Drawer> {
    return await this.drawerModel.findOneAndDelete({ slug });
  }

  async findOneBySlug(slug: string): Promise<Drawer> {
    return await this.drawerModel.findOne({ slug: "new-drawer" }, { strict: false }).exec()
  }

  async updateOneBySlug(slug: string, drawer: UpdateDrawerDto): Promise<Drawer> {
    console.log("Drawer>>", drawer);
    return await this.drawerModel.findOneAndUpdate({ slug }, drawer, { new: true });
  }
}
