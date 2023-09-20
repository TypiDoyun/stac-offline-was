import { PartialType, PickType } from "@nestjs/mapped-types";
import { Clothes } from "../clothes.entity";

export class UpdateClothesDto extends PartialType(
    PickType(Clothes, [
        "name",
        "price",
        "discountRate",
        "size",
        "comment",
        "images"
    ])
) {}
