import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './Post.schema';
import { Model, Types } from 'mongoose';
import { PostRequest } from './Post.request';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postCollection: Model<Post>) {}
    
    async createPost(userId: string, request: PostRequest): Promise<Post> {
        const userObjectId = new Types.ObjectId(userId)
        const savePost = new this.postCollection({...request, author: userObjectId})
        return await savePost.save()
    }
    
    async findAll(): Promise<Post[]> {
        
        return await this.postCollection.find().exec()
    }
    
    async findByAuthorObjectId(userId: Types.ObjectId): Promise<Post[]> {
        return await this.postCollection.find({author: userId}).exec()
    }
    
}
