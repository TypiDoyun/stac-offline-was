import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MerchantRepository } from "./merchant.repository";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, MerchantRepository]
})
export class AuthModule {}
