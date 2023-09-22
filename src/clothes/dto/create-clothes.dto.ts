import { PickType } from "@nestjs/mapped-types";
import { Clothes } from "../clothes.entity";

export class CreateClothesDto extends PickType(Clothes, [
    "name",
    "price",
    "size",
    "comment",
    "discountRate",
    "images"
]) {}
