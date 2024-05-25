import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api'); // New
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173'
    ],
    credentials: true,
  });


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
