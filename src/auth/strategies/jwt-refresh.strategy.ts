import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    "jwt-refresh"
) {
    constructor(private readonly configService: ConfigService) {
        super({
            secretOrKey: configService.getOrThrow("JWT_REFRESH_SECRET_KEY"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true
        });
    }

    public async validate(request: Request, payload: JwtPayload) {
        const refreshToken = request.get("authorization").split(" ")[1];
        return {
            ...payload,
            refreshToken
        };
    }
}
