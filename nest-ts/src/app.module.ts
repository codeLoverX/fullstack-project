import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DummyModule } from './dummy/posts.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/typeorm-pg.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsResponseFilter } from './utils/filters/exceptions-response.filter';

@Module({
  // use this global exception catcher
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsResponseFilter,
    },
  ],
  imports: [
    PostsModule, 
    DummyModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
