import {  Request, Response } from 'express'
import Post from './posts.interface'
import { posts } from './posts.dummy'
import Controller from '../controller/controller.base'

class PostsController extends Controller {
    private posts: Post[]

    constructor() {
        super('/posts')

        this.posts = posts

        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllPosts);

        this.router.post(this.path, this.createAPost);
    }

    public getRouter() {
        return this.router
    }

    public getAllPosts = (request: Request, response: Response) => {
        response.send(this.posts)
    }

    public createAPost = (request: Request, response: Response) => {
        const post: Post = request.body

        this.posts.push(post)

        response.send(post)
    }
}

export default PostsController
