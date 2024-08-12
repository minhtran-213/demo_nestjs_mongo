import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PostRequest {
    
    @Field({nullable: false})
    title: string
    
    @Field()
    content: string
}
