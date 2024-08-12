import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstant } from "src/common/utils";
import { AuthPayload } from "./auth_payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstant.secret
        })
    }
    
    async validate(payload: AuthPayload) {
        return {userId: payload.id, username: payload.username}
    }
}
