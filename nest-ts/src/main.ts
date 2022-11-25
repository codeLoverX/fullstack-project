import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
// import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
// import { ExcludeNullInterceptorInterceptor } from './utils/interceptors/exclude-null.interceptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The Awesome API Description')
    .setVersion('1.0')
    // .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // The  ClassSerializerInterceptor needs the Reflector when initializing.
  // Reflection like Java
  //  all controllers now have the interceptor applied to them
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(
  //   app.get(Reflector))
  // );
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(
  //   app.get(Reflector))
  // );
  //   app.useGlobalInterceptors(new ExcludeNullInterceptor());
  // );
  await app.listen(3000);
}
bootstrap();
