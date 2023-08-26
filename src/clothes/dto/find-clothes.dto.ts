import { PartialType, PickType } from "@nestjs/mapped-types";
import { Clothes } from "../clothes.entity";

export class FindClothesDto extends PartialType(
    PickType(Clothes, ["name", "price", "size", "comment", "discountRate"])
) {}
