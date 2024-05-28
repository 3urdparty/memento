import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckSchema } from './schemas/deck.schema';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { DrawerSchema } from 'src/drawers/schema/drawer.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }]),
  MongooseModule.forFeature([{ name: 'Drawer', schema: DrawerSchema }]),
  MulterModule.register({ dest: './storage/' })
  ],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule { }
