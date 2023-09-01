import { Module } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "./shop.entity";
import { MerchantRepository } from "src/auth/merchant/merchant.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Shop])],
    providers: [ShopService, MerchantRepository],
    controllers: [ShopController]
})
export class ShopModule {}
