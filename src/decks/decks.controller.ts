import { Controller, Get, Post, Put, Delete, Body, Param, Req, RawBodyRequest, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { DecksService } from './decks.service';
import { Deck } from './schemas/deck.schema';
import mongoose, { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateDeckDto } from './dto/create-deck.dto';


@ApiTags('decks')
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
}
