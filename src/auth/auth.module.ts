import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "./user/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.controller";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { MerchantRepository } from "./merchant/merchant.repository";
import { MerchantJwtStrategy } from "./strategies/merchant-jwt.strategy";
import { HttpModule } from "@nestjs/axios";
import { RegisteredMerchantJwtStrategy } from "./strategies/registered-merchant-jwt.strategy copy";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({}),
        HttpModule
    ],
    controllers: [AuthController, UserController],
    providers: [
        AuthService,
        UserRepository,
        MerchantRepository,
        JwtStrategy,
        MerchantJwtStrategy,
        RegisteredMerchantJwtStrategy,
        JwtRefreshStrategy,
        UserService
    ],
    exports: [
        JwtStrategy,
        MerchantJwtStrategy,
        JwtRefreshStrategy,
        RegisteredMerchantJwtStrategy,
        PassportModule
    ]
})
export class AuthModule {}
