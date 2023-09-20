import { Module } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "./shop.entity";
import { MerchantRepository } from "src/auth/merchant/merchant.repository";
import { ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [TypeOrmModule.forFeature([Shop]), HttpModule],
    providers: [ShopService, MerchantRepository, ConfigService],
    controllers: [ShopController]
})
export class ShopModule {}
