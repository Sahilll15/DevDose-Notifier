import { webcrypto } from 'crypto';
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.useStaticAssets(join(__dirname, '..', 'views'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('html');

    const config = new DocumentBuilder()
      .setTitle('Learning Notifier')
      .setDescription(
        'Learning Notifier API - Daily learning topics for developers',
      )
      .setVersion('1.0')
      .addTag('home', 'Home page and UI endpoints')
      .addTag('registration', 'User registration endpoints')
      .addTag('notifications', 'Notification management endpoints')
      .addTag('swagger-auth', 'Swagger authentication endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}
bootstrap();
