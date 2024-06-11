import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
//@ts-ignore
import { Seeder, DataFactory } from "nestjs-seeder";

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) { }

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(User).generate(10);
    const defaultUser = DataFactory.createForClass(User).generate(1, {
      email: 'mustafa.y.elagib@gmail.com',
      password: 'Password123+'
    })
    users.push(defaultUser[0]);
    return this.user.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
