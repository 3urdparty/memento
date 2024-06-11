// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards/cards.module';
import { ServeStaticModule } from '@nestjs/serve-static'; // New
import { DecksModule } from './decks/decks.module';
import { UsersModule } from './users/users.module';
import { DrawersModule } from './drawers/drawers.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CardsModule,
    UsersModule,
    DrawersModule,
    DecksModule,
    AuthModule,
    ServeStaticModule.forRoot({ // New
      renderPath: '/',
      rootPath: join(__dirname, '..', 'client'),
    }), // New
    ServeStaticModule.forRoot({ // New 
      renderPath: '/storage', // const name = new type(arguments);
      rootPath: 'storage', // New
      serveRoot: '/storage', // New
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
