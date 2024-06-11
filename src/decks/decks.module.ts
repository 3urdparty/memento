import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckSchema } from './schemas/deck.schema';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { DrawerSchema } from 'src/drawers/schema/drawer.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CardsService } from 'src/cards/cards.service';
import { CardsModule } from 'src/cards/cards.module';
import { CardSchema } from 'src/cards/schemas/card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }]),
    MongooseModule.forFeature([{ name: 'Drawer', schema: DrawerSchema }]),
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    MulterModule.register({ dest: './storage/' }),
  ],
  controllers: [DecksController],
  providers: [DecksService, CardsService],
})
export class DecksModule { }
