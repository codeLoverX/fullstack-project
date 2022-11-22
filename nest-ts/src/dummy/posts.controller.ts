import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags("Dummy Data Controller")
@Controller('dummy')
export default class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) { }

  @Get()
  @ApiResponse({ status: 201, description: 'Successful.' })
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Successful.' })
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Successful.' })
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.replacePost(Number(id), post);
  }

  @ApiResponse({ status: 201, description: 'Successful.' })
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
