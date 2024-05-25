import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
//@ts-ignore
import { Seeder, DataFactory } from "nestjs-seeder";
import { Drawer } from "../schema/drawer.schema";

@Injectable()
export class DrawersSeeder implements Seeder {
  constructor(@InjectModel(Drawer.name) private readonly drawer: Model<Drawer>) { }

  async seed(): Promise<any> {
    // Generate 10 drawers.
    const drawers = DataFactory.createForClass(Drawer).generate(0);
    return this.drawer.insertMany(drawers);
  }

  async drop(): Promise<any> {
    return this.drawer.deleteMany({});
  }
}
