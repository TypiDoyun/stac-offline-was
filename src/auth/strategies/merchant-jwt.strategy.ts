import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { MerchantRepository } from "../merchant/merchant.repository";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class MerchantJwtStrategy extends PassportStrategy(
    Strategy,
    "merchant-jwt"
) {
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
        const { id, isMerchant } = payload;
        if (!isMerchant) throw new UnauthorizedException("permission error");
        const foundMerchant = await this.merchantRepository.findMerchantById(
            id
        );

        if (foundMerchant === null)
            throw new UnauthorizedException("invalid token");

        return foundMerchant;
    }
}
