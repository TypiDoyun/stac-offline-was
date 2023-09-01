import { Body, Controller, Post } from "@nestjs/common";
import { RegisterShopDto } from "src/auth/dto/register-shop.dto";
import { MerchantPrivate, UserField } from "src/common/decorators";
import { ShopService } from "./shop.service";
import { Merchant } from "src/auth/merchant/merchant.entity";

@Controller("shop")
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @Post()
    @MerchantPrivate()
    public async registerShop(
        @Body() registerShopDto: RegisterShopDto,
        @UserField() merchant: Merchant
    ) {
        console.log(merchant);
        return this.shopService.registerShop(registerShopDto, merchant);
    }
}
