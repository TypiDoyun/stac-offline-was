import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { RegisterShopDto } from "src/auth/dto/register-shop.dto";
import {
    MerchantPrivate,
    RegisteredMerchantPrivate,
    UserField
} from "src/common/decorators";
import { ShopService } from "./shop.service";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("shop")
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @Post()
    @MerchantPrivate()
    @UseInterceptors(FileInterceptor("image"))
    public async registerShop(
        @UploadedFile() image: Express.Multer.File,
        @Body() registerShopDto: RegisterShopDto,
        @UserField() merchant: Merchant
    ) {
        console.log("registerShop request received!");
        console.log(merchant);
        return this.shopService.registerShop(registerShopDto, merchant);
    }

    @Get()
    @RegisteredMerchantPrivate()
    public async getShop(@UserField() merchant: Merchant) {
        console.log("shop");
        const a = await this.shopService.getShop(merchant);
        console.log(a);
        return a;
    }
}
