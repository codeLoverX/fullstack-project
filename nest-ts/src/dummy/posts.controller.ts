import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { Request, Response } from 'express';

//  for creating posts without @Body and using vanilla express
// we need express Request+ Response from express, ApiBody/ApiParams from swagger 
// and interface
interface RequestWithCustomBody {
  post: {
    title: string
    content: string
  }
}

interface RequestWithCustomParam {
  // postId: string
  params: {
    postId: string,
    [key: string]: any
  }
}
// for creating posts without @Body and using vanilla express
// we need express Request+ Response from express, ApiBody/ApiParams from swagger 
// and interface

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

  //  Vanilla aexpress (Request and Response)
  //  for creating posts without @Body we need express Request and interface
  // The SwaggerModule searches for all @Body(), @Query(), and @Param() decorators 
  // in route handlers to generate the API document. 
  @Post('vanillaExpress')
  @ApiBody({
    schema: {
      properties: {
        'content': { type: 'string' },
        'title': { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Successful.' })
  async createPostVanilla(@Req() request: RequestWithCustomBody, @Res() response: Response) {
    const { post } = request
    response.send(this.postsService.createPost(post));
  }

  @ApiResponse({ status: 201, description: 'Successful.' })
  @ApiParam({ name: 'postId', type: String })
  @Delete('vanillaExpress/:postId')
  async deletePostVanilla(@Req() request: RequestWithCustomParam, @Res() response: Response) {
    const { postId } = request.params
    console.log({ postId })
    response.send(this.postsService.deletePost(Number(postId)));
  }



}
