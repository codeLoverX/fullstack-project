import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import CreatePostDto from './dto/create-post.dto';
import Post from './post.entity';
import UpdatePostDto from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostNotFoundException from './exceptions/not-found.exception';
import { ExceptionsLoggerFilter } from 'src/utils/filters/exceptions-logger.filter';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) { }

  getAllPosts() {
    return this.postsRepository.find();
  }

  // apply filters. A fliter is a custom exception
  @UseFilters(ExceptionsLoggerFilter)
  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (post) {
      return post;
    }
    // custom exception second way. Third way is globally
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  // apply filters. A fliter is a custom exception
  @UseFilters(ExceptionsLoggerFilter)
  async updatePost(id: number, post: UpdatePostDto) {
    const newPost = await this.postsRepository.update(id, post);
    console.log({ newPost })
    const updatedPost = await this.postsRepository.findOne({ where: { id } });
    if (updatedPost) {
      return updatedPost
    }
    // custom exception second way. Third way is globally
    throw new PostNotFoundException(id);
  }

  // apply filters. A fliter is a custom exception
  @UseFilters(ExceptionsLoggerFilter)
  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      // custom exception second way. Third way is globally
      throw new PostNotFoundException(id);
    }
  }
}
