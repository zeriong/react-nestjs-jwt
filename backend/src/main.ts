import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: `http://localhost:${process.env.PORT}`,
    credentials: true,
  });

  console.log('***************************************');
  console.log('web start ', process.env.NODE_ENV, process.env.PORT);
  console.log('***************************************');

  await app.listen(process.env.PORT);
}
bootstrap();
