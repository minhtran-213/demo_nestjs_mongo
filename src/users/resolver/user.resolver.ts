import { Args, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { User } from '../schema/User.schema';
import { UserService } from '../service/user.service';
import { CreateUserRequest, UpdateUserRequest } from '../dto';
import { MongoObjectId } from 'src/common/scalar/User.scalar';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/Post.schema';

@Resolver(() => User)
export class UserResolver {

    constructor(private userService: UserService, @Inject(forwardRef(() => PostsService)) private postService: PostsService) {}

    @Query(() => [User])
    @UseGuards(JwtAuthGuard)
    getAllUsers() {
        return this.userService.getUsers()
    }

    @Query(() => User, {nullable: true})
    async getUserById(@Args('id', { type: () => MongoObjectId }) id: MongoObjectId) {
        return await this.userService.getUserById(id);
    }

    @Mutation(() => User)
    createUser(@Args('request') request: CreateUserRequest) {
        return this.userService.createUser(request)
    }

    @Mutation(() => User)
    async updateUser(@Args('id', {type: () => MongoObjectId}) id: MongoObjectId, @Args('request') request: UpdateUserRequest) {
        return await this.userService.updateUser(id, request)
    }

    @Mutation(() => User, {nullable: true})
    async deleteUser(@Args('id', {type: () => MongoObjectId}) id: MongoObjectId) {
        return await this.userService.deleteUser(id)
    }
    
    @ResolveField('posts', () => [Post])
    async getPosts(@Parent() user: User) {
        return this.postService.findByAuthorObjectId(user._id)
    }
}
