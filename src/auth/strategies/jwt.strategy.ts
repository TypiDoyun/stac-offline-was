import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { MerchantRepository } from "../merchant/merchant.repository";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly merchantRepository: MerchantRepository,
        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.getOrThrow("JWT_ACCESS_SECRET_KEY"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    public async validate(payload: JwtPayload) {
        const { id } = payload;
        const foundUser = await this.userRepository.findUserById(id);
        const foundMerchant = await this.merchantRepository.findMerchantById(
            id
        );
        const found = foundMerchant ?? foundUser;

        if (found === null) throw new UnauthorizedException("invalid token");

        return found;
    }
}
