import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/User.schema';
import { UserService } from 'src/users/service/user.service';
import { AuthPayload } from './auth_payload.interface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
        
    }
    
    async validateUser(username: string, password: string) {
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
        }
        
        const isMatchedPassword = password === user.password
        if (isMatchedPassword) {
            const {password, ...userRecord} = user
            return userRecord
        }
        return null
    }
    
    async login(user: User) {
        const payload : AuthPayload = {
            name: user.displayName,
            email: user.email,
            id: user._id,
            username: user.username
        }
        
        const token = await this.jwtService.signAsync(payload, { expiresIn: '5mins' });
        return {
            accessToken: token
        }
    }
}
