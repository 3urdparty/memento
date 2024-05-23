import { Injectable } from '@nestjs/common';
import { CreateDrawerDto } from './dto/create-drawer.dto';
import { UpdateDrawerDto } from './dto/update-drawer.dto';

@Injectable()
export class DrawersService {
  create(createDrawerDto: CreateDrawerDto) {
    return 'This action adds a new drawer';
  }

  findAll() {
    return `This action returns all drawers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drawer`;
  }

  update(id: number, updateDrawerDto: UpdateDrawerDto) {
    return `This action updates a #${id} drawer`;
  }

  remove(id: number) {
    return `This action removes a #${id} drawer`;
  }
}
