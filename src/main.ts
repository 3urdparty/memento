import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
    enableDebugMessages: true,
    skipNullProperties: true,
    transform: true,
    exceptionFactory: (errors) => {
      const result = errors.reduce((acc, error) => {
        const propertyName = error.property;
        const errorMessage = error.constraints[Object.keys(error.constraints)[0]];
        return {
          ...acc,
          [propertyName]: errorMessage,
        };
      }, {});

      return new BadRequestException(result);
    }
  }));


  app.setGlobalPrefix('api'); // New
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173'
    ],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Memento API')
    .setDescription('The Memento API description')
    .setVersion('1.0')
    .addTag('memento')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)


  await app.listen(process.env.PORT || 3000,
    () => {
      console.log(`🚀 Application running at port ${process.env.PORT || 3000}`)
    });
}
bootstrap();
