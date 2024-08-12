import { PostsService } from './posts.service';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostRequest } from './Post.request';
import { CurrentUser } from 'src/common/custom_decorators/current_user.decorator';
import { Post } from './Post.schema';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/schema/User.schema';
import { UserService } from 'src/users/service/user.service';

@Resolver(() => Post)
export class PostsResolver {
    constructor(private postService: PostsService, @Inject(forwardRef(() => UserService)) private userService: UserService){}
    
    @Mutation(() => Post)
    @UseGuards(JwtAuthGuard)
    createPostForUser(@CurrentUser() user: {userId: string, username: string}, @Args('request') request: PostRequest) {
        return this.postService.createPost(user.userId, request)
    }
    
    @Query(() => [Post])
    async findAllPosts() {
        return await this.postService.findAll()
    }
    
    @ResolveField('author', () => User)
    async getAuthor(@Parent() post: Post) {
        
        return this.userService.getUserById(post.author);
    }
}
