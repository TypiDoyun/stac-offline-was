import { Module } from "@nestjs/common";
import { ClothesController } from "./clothes.controller";
import { ClothesService } from "./clothes.service";
import { DatabaseModule } from "src/modules/database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clothes } from "./clothes.entity";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Clothes])],
    controllers: [ClothesController],
    providers: [ClothesService]
})
export class ClothesModule {}
