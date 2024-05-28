// src/schemas/menu.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document, HydratedDocument, Types } from 'mongoose';
import { Flashcard, Tag } from 'src/flashcards/schemas/flashcard.schema';
import { User } from 'src/users/schemas/user.schema';
import { Property } from '../entities/deck.entity';
import { Factory } from 'nestjs-seeder';
import { Drawer } from 'src/drawers/schema/drawer.schema';

export type DeckDocument = HydratedDocument<Deck>


export class Field {
  type:
    | 'text'
    | 'longtext'
    | 'number'
    | 'multiselect'
    | 'date'
    | 'time'
    | 'datetime'
    | 'color'
    | 'range'
    | 'file'
    | 'checkbox'
    | 'select'
    | 'users';
  icon?: any;
  value?: any;
  required?: boolean;
  removable?: boolean;
  placeholder?: string;
  movable?: boolean;
  editable?: boolean;
  default?: string;
  options?: { name: string; value: string; icon?: any }[];
};
@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
  toJSON: {
    getters: true,
    virtuals: true,
  },
})


export class Deck {

  @Prop({ virtual: true, get: function() { return this._id } })
  slug: string;

  @Factory((faker) => faker.helpers.arrayElement(['easy', 'medium', 'hard', 'very hard', 'expert']))
  @Prop({ required: true, enum: ['easy', 'medium', 'hard', 'very hard', 'expert'] })
  difficulty: string;

  @Factory(faker => faker.image.url())
  @Prop({ required: false, get: (url: string) => `${process.env.IMAGES_URL}/${url}` })
  coverUrl: string;

  @Prop({ virtual: true, get: function() { return this.cards.length } })
  total: number

  @Prop({ virtual: true, get: function() { return this.cards.length } })
  new: number;

  @Prop({ virtual: true, get: function() { return this.cards.length } })
  due: number;

  @Prop({ virtual: 'leech', get: function() { return this.cards.length }, })
  leech: number;

  @Prop({ virtual: true, get: function() { return this.cards.length } })
  suspended?: number;

  @Factory(faker => faker.number.int({ min: 0, max: 5 }))
  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ virtual: true, get: function() { return [] } })
  recentStudents?: number;

  @Factory(() => [])
  @Prop({ required: true, default: [] })
  properties: Property[];

  @Factory(() => [])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  contributors: User[];

  @Factory(faker => faker.lorem.words(4))
  @Prop({ required: true, type: Field })
  name: string;

  @Factory(faker => faker.lorem.paragraph())
  @Prop({ required: true })
  description: string;

  @Factory(() => [])
  @Prop({ required: true })
  tags: Tag[];

  @Factory(() => [])
  @Prop({ required: false })
  cards: Flashcard[];

  @Prop({ type: [Types.ObjectId], ref: Drawer.name })
  drawers?: Drawer[];
}



export const DeckSchema = SchemaFactory.createForClass(Deck)
