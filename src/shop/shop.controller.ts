import {
    Body,
    Controller,
    Get,
    Post,
    Query,
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
    public async registerShop(
        @UploadedFile() logo: Express.Multer.File,
        @Body() registerShopDto: RegisterShopDto,
        @UserField() merchant: Merchant
    ) {
        console.log("registerShop request received!");
        console.log(merchant);
        return this.shopService.registerShop(logo, registerShopDto, merchant);
    }

    @Post("/image")
    @MerchantPrivate()
    @UseInterceptors(FileInterceptor("logo"))
    public async uploadImage(@UploadedFile() logo: Express.Multer.File) {
        return this.shopService.uploadImage(logo);
    }
    @Get()
    @RegisteredMerchantPrivate()
    public async getShop(@UserField() merchant: Merchant) {
        console.log("shop");
        const a = await this.shopService.getShop(merchant);
        console.log(a);
        return a;
    }

    @Get("/location")
    public async getShopByLocation(
        @Query("latitude") latitude: number,
        @Query("longitude") longitude: number
    ) {
        const foundShops = await this.shopService.getShopByLocation([
            latitude,
            longitude
        ]);

        return foundShops;
    }
}
