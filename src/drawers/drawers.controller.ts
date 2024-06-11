import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DrawersService } from './drawers.service';
import { Drawer } from './schema/drawer.schema';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDrawerDto } from './dto/update-drawer.dto';
import { CreateDrawerDto } from './dto/create-drawer.dto';

@ApiTags('drawers')
@Controller('drawers')
export class DrawersController {
  constructor(private readonly drawersService: DrawersService) { }

  @Get()
  async findAll(): Promise<Drawer[]> {
    return await this.drawersService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Drawer> {
    return await this.drawersService.findOneBySlug(slug);
  }

  @Post()
  async create(@Body() drawer: CreateDrawerDto): Promise<Drawer> {
    return await this.drawersService.create(drawer);
  }

  @Put(':slug')
  async update(@Param('slug') slug: string, @Body() drawer: UpdateDrawerDto): Promise<Drawer> {
    return await this.drawersService.updateOneBySlug(slug, drawer);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string): Promise<Drawer> {
    return await this.drawersService.deleteBySlug(slug);
  }
}
