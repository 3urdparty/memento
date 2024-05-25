import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Drawer, DrawerSchema } from './schema/drawer.schema';
import { DrawersController } from './drawers.controller';
import { DrawersService } from './drawers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Drawer.name,
        schema: DrawerSchema,
      }
    ])
  ],
  controllers: [DrawersController],
  providers: [DrawersService],
})
export class DrawersModule { }
