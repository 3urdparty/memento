import { Controller, Get, Post, Put, Delete, Body, Param, Req, RawBodyRequest, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { DecksService } from './decks.service';
import { Deck } from './schemas/deck.schema';
import mongoose, { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateDeckDto } from './dto/create-deck.dto';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { Card } from 'src/cards/schemas/card.schema';
import { CardsService } from 'src/cards/cards.service';


@ApiTags('decks')
@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService, private readonly cardsService: CardsService) { }

  @Get()
  async findAll(): Promise<Deck[]> {
    return await this.decksService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Deck> {
    return await this.decksService.findBySlug(slug);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() deck: Deck): Promise<Deck> {
    return await this.decksService.update(id, deck);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Deck> {
    return await this.decksService.delete(id);
  }

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('coverImage', {
    storage: diskStorage({
      destination: './storage/images/',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}.${file.originalname.split('.').pop()}`;
        cb(null, filename);
      },
    }),
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() deck: CreateDeckDto): Promise<Deck> {
    console.log('Deck', deck)
    if (file)
      deck.coverUrl = file.filename;
    return await this.decksService.create(deck);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './storage/images/',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}.${file.originalname.split('.').pop()}`;
        cb(null, filename);
      },
    }),
  }))
  @Post(':id/cards')
  async createCard(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') deckId: string,
    @Body() card: CreateCardDto
  ): Promise<Card> {
    console.log('Card', card)
    // if (file)
    //   card.= file.filename;
    const newCard = await this.cardsService.create(card);
    await this.decksService.addCard(deckId, newCard._id)
    return newCard;
  }
}
