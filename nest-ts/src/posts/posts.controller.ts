import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExcludeNullInterceptorInterceptor } from 'src/utils/interceptors/exclude-null.interceptor.interceptor';

@ApiTags("Posts Controller")
@UseInterceptors(ClassSerializerInterceptor)
//  custom interceptor
@UseInterceptors(ExcludeNullInterceptorInterceptor)
@Controller('posts')
export default class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
