import { ASTNode, Kind } from "graphql";
import { CustomScalar, Scalar } from "@nestjs/graphql";

import { ObjectId } from 'mongodb'

@Scalar("ObjectId")
export class MongoObjectId implements CustomScalar<String, ObjectId> {
    description = "Mongodb Object Id"
    parseValue(value: string): ObjectId{
        return new ObjectId(value)
    }
    serialize(objectId: ObjectId): string {
        return objectId.toHexString()
    }
    parseLiteral(ast: ASTNode):ObjectId {
        if (ast.kind === Kind.STRING) {
            return new ObjectId(ast.value)
        }
        return null
    }
    
}
