import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Projeto API')
    .setDescription('API para o projeto Padaria Bom Pão')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new HttpException(
          {
            message: 'Entrada de dados invalida',
            errors: errors,
          },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permitir apenas este domínio
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  });

  await app.listen(3001);
}
bootstrap();








