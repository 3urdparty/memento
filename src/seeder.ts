import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users/schemas/user.schema";
import { UsersSeeder } from "./users/seeders/users.seeder";

seeder({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/nestjs-seeder-sample"),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
}).run([UsersSeeder]);
