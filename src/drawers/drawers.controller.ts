import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrawersService } from './drawers.service';
import { CreateDrawerDto } from './dto/create-drawer.dto';
import { UpdateDrawerDto } from './dto/update-drawer.dto';

@Controller('drawers')
export class DrawersController {
  constructor(private readonly drawersService: DrawersService) {}

  @Post()
  create(@Body() createDrawerDto: CreateDrawerDto) {
    return this.drawersService.create(createDrawerDto);
  }

  @Get()
  findAll() {
    return this.drawersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drawersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrawerDto: UpdateDrawerDto) {
    return this.drawersService.update(+id, updateDrawerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drawersService.remove(+id);
  }
}
