import { User, UserSchema } from './schema/User.schema';

import { forwardRef, Module } from '@nestjs/common';
import { MongoObjectId } from 'src/common/scalar/User.scalar';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    forwardRef(() => PostsModule)
  ],
  providers: [UserResolver, UserService, MongoObjectId],
  exports: [UserService]
})
export class UsersModule {}
