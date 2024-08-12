import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UserSettingsRequest {
    
    @Field(() => Boolean, { nullable: true })
    receivesNotification?: boolean

    @Field(() => Boolean, { nullable: true })
    receivesSMS?: boolean
}

@InputType()
export class CreateUserRequest {

    @Field({nullable: false})
    username: string

    @Field({nullable: true})
    displayName?: string

    @Field({nullable: false})
    email: string
    
    @Field({nullable: false})
    password: string
    
    @Field()
    userSettingsRequest: UserSettingsRequest
}


@InputType()
export class UpdateUserRequest {

    @Field({nullable: true})
    displayName?: string

    @Field({nullable: true})
    email?: string
}
