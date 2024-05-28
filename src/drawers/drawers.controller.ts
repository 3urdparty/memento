import { Controller, Get, Post, Put, Delete, Body, Param, Req, RawBodyRequest } from '@nestjs/common';
import { DrawersService } from './drawers.service';
import { Drawer } from './schema/drawer.schema';
import mongoose from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drawers')
@Controller('drawers')
export class DrawersController {
  constructor(private readonly drawersService: DrawersService) { }

  @Get()
  async findAll(): Promise<Drawer[]> {
    return await this.drawersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Drawer> {
    return await this.drawersService.findOne(id);
  }


  @Post()
  async create(@Req() req: RawBodyRequest<Request>): Promise<Drawer> {
    console.log(req.body)
    const drawer = {
      name: 'New Drawer',
      icon: 'Icon',
      description: 'New Drawer',
      tags: [],
      slug: '',
      url: ''

    }
    return await this.drawersService.create(drawer);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() drawer: Drawer): Promise<Drawer> {
    return await this.drawersService.update(id, drawer);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Drawer> {
    return await this.drawersService.delete(id);
  }
}
