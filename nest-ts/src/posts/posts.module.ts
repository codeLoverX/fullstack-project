import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import Post from './entity/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // TYpeorm table 
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  // service must be in providers t be used in the module
  providers: [PostsService],
})
export class PostsModule {}
