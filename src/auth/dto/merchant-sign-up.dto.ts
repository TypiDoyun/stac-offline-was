import { PickType } from "@nestjs/mapped-types";
import { Merchant } from "../merchant/merchant.entity";

export class MerchantSignUpDto extends PickType(Merchant, [
    "id",
    "username",
    "password"
]) {}
