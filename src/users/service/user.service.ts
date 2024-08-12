import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/User.schema';
import mongoose, { Model, mongo, Types } from 'mongoose';
import { CreateUserRequest, UpdateUserRequest } from '../dto';
import { MongoObjectId } from 'src/common/scalar/User.scalar';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userCollection: Model<User>) {}


    async getUsers() {
        return await this.userCollection.find()
    }

    async createUser(request: CreateUserRequest) {
        const { userSettingsRequest, ...userData } = request;
        const newUser = new this.userCollection({...userData, _id: new Types.ObjectId(), settings: userSettingsRequest})
        return await newUser.save()
    }

    async getUserById(id: MongoObjectId | Types.ObjectId) {
        if (mongoose.isValidObjectId(id)) {
            return await this.userCollection.findById(id).exec()
        }
        console.warn('Not a valid id')
    }

    async updateUser(id: MongoObjectId, request: UpdateUserRequest) {
        if (mongoose.isValidObjectId(id)) {
            return await this.userCollection.findByIdAndUpdate(id, request)
        }
        console.warn('Not a valid id')

    }

    async deleteUser(id: MongoObjectId) {
        if (mongoose.isValidObjectId(id)) {
            return await this.userCollection.findByIdAndDelete(id)
        }
    }
    
    async getUserByUsername(username: string): Promise<User> {
        return await this.userCollection.findOne({username})
    }
}
