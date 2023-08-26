import { Module } from "@nestjs/common";
import { ClothesService } from "./clothes.service";
import { DatabaseModule } from "src/modules/database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clothes } from "./clothes.entity";
import { UserRepository } from "src/auth/user/user.repository";
import { ClothesController } from "./clothes.controller";
import { MerchantRepository } from "src/auth/merchant/merchant.repository";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Clothes])],
    controllers: [ClothesController],
    providers: [ClothesService, UserRepository, MerchantRepository]
})
export class ClothesModule {}
