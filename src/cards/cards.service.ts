// src/menus/menus.services.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateCardDto } from './dto/update-card.dto';
import { Card, CardDocument } from './schemas/card.schema'
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
  ) { }

  async create(createCardDto: CreateCardDto): Promise<CardDocument> {
    const card = new this.cardModel(createCardDto);
    return card.save();
  }

  async findAll(): Promise<CardDocument[]> {
    return this.cardModel.find();
  }

  findOne(id: string) {
    return this.cardModel.findById(id);
  }

  async update(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardDocument> {
    return this.cardModel.findByIdAndUpdate(id, updateCardDto);
  }

  async remove(id: number) {
    return this.cardModel.findByIdAndDelete(id);
  }

  async removeMany(ids: string[]) {
    return this.cardModel.deleteMany({ _id: { $in: ids } });
  }
}
