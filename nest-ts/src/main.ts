import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { config as configAWS } from 'aws-sdk';

// import * as cookieParser from 'cookie-parser';
// import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
// import { ExcludeNullInterceptorInterceptor } from './utils/interceptors/exclude-null.interceptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // add swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('The Awesome API')
    .setDescription('The Awesome API Description')
    .setVersion('1.0')
    // .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
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
  configAWS.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  await app.listen(configService.get('PORT') ?? 8000);
}
bootstrap();
