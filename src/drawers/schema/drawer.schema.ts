import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { Deck } from 'src/decks/schemas/deck.schema';
import { Tag } from 'src/flashcards/schemas/flashcard.schema';
import { DrawersService } from '../drawers.service';


export type DrawerDocument = Drawer & Document;


@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})


export class Drawer {
  @Factory((faker) => 'icon')
  icon: string;

  @Factory((faker) => faker.word.words(2))
  @Prop({ required: true })
  name: string;

  @Factory((faker) => faker.word.words(20))
  @Prop({ required: false })
  description: string;

  @Factory(() => [])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], default: [] })
  tags: Tag[];

  @Factory(() => [])
  @Prop({ type: [Types.ObjectId], ref: 'Deck', default: [] })
  decks?: Deck[];

  @Prop({ required: false })
  slug: string;

  @Prop({
    virtual: true,
    get: function() {
      return `${process.env.BASE_URL}/drawers/${this.slug}`
    }
  })

  url: string;
}


export const DrawerSchema = SchemaFactory.createForClass(Drawer)

DrawerSchema.pre('save', function(next) {
  //@ts-ignore
  // this.decks = this.decks.map(deck => deck._id)
  this.slug =
    this.name.toLowerCase().replace(/ /g, '-')
  next()
})

