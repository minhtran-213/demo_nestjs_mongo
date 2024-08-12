import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

import { MongoObjectId } from "src/common/scalar/User.scalar";
import { Post } from "src/posts/Post.schema";


@ObjectType()
@Schema()
class UserSettings {
  @Field(() => Boolean)
  @Prop({ default: true })
  receivesNotification: boolean;

  @Field(() => Boolean)
  @Prop({ default: true })
  receivesSMS: boolean;
}



@Schema()
@ObjectType()
export class User {

    @Field(() => MongoObjectId, {nullable: true})
    @Prop({required: false})
    _id?: mongoose.Types.ObjectId

    @Field({nullable: false})
    @Prop({unique: true})
    username: string

    @Field()
    @Prop()
    displayName: string

    @Field({nullable: true})
    @Prop()
    avatarUrl: string

    @Field({nullable: false})
    @Prop({unique: true})
    email: string
    
    @Field({nullable: false})
    @Prop()
    password: string
    
    @Field()
    @Prop({type: UserSettings})
    settings?: UserSettings
    
    @Field(() => [Post], {nullable: 'items'})
    posts?: Post[]
}

export const UserSchema = SchemaFactory.createForClass(User)
