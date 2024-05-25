import { Controller, Get, Post, Put, Delete, Body, Param, Req, RawBodyRequest } from '@nestjs/common';
import { DecksService } from './decks.service';
import { Deck } from './schemas/deck.schema';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) { }

  @Get()
  async findAll(): Promise<Deck[]> {
    return await this.decksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Deck> {
    return await this.decksService.findOne(id);
  }

  @Post()
  async create(@Req() req: RawBodyRequest<Request>): Promise<Deck> {
    const deck = {
      name: 'New Deck',
      description: 'New Deck',
      tags: [],
      slug: '',
      url: '',
      difficulty: 'easy',
      cards: [],
      rating: 4,
      coverUrl: 'https://via.placeholder.com/150'
    }
    return await this.decksService.create(deck);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() deck: Deck): Promise<Deck> {
    return await this.decksService.update(id, deck);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Deck> {
    return await this.decksService.delete(id);
  }
}
