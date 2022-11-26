import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';
import FindOneByIdParams from './params/find-one-by-id-params';


@Controller('posts')
export default class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) { }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  //  params validation
    // async getPostById(@Param('id') id: string,: CreatePostDto) 
  getPostById(@Param() { id }: FindOneByIdParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Patch(':id')
  //  params validation
  // async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
  async updatePost(@Param() { id }: FindOneByIdParams, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneByIdParams) {
    return this.postsService.deletePost(Number(id));
  }
}

