import { Module } from '@nestjs/common';
import PostsController  from './posts.controller';
import PostsService from './posts.service';

@Module({

  controllers: [PostsController],
// service must be in providers
  providers: [PostsService]
})
export class DummyModule {}
