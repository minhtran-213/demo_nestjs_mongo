import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './Post.schema';
import { User, UserSchema } from 'src/users/schema/User.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PostsService, PostsResolver],
  imports: [
    MongooseModule.forFeature([
        {
            name: Post.name,
            schema: PostSchema
        }
    ]),
    forwardRef(() => UsersModule)
  ],
  exports: [PostsService]
})
export class PostsModule {}
