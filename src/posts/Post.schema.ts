import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { MongoObjectId } from "src/common/scalar/User.scalar";
import { User } from "src/users/schema/User.schema";

@Schema()
@ObjectType()
export class Post {
    
    @Field(() => MongoObjectId)
    _id: mongoose.Types.ObjectId
    
    @Field()
    @Prop()
    title: string
    
    @Field()
    @Prop()
    content: string
    
    @Field(() => User, {nullable: true})
    @Prop({type: mongoose.Types.ObjectId, ref: 'User', required: true})
    author: mongoose.Types.ObjectId
    
}

export const PostSchema = SchemaFactory.createForClass(Post)
