import { PickType } from "@nestjs/mapped-types";
import { Shop } from "src/shop/shop.entity";

export class RegisterShopDto extends PickType(Shop, [
    "name",
    "address",
    "logo",
    "registrationNumber"
]) {}
