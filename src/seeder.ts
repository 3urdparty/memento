//@ts-ignore
import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users/schemas/user.schema";
import { UsersSeeder } from "./users/seeders/users.seeder";
import { Deck, DeckSchema } from "./decks/schemas/deck.schema";
import { DecksSeeder } from "./decks/seeders/deck.seeder";

seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
  ],
}).run([UsersSeeder, DecksSeeder]);
