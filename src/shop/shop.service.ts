import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterShopDto } from "src/auth/dto/register-shop.dto";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { MerchantRepository } from "src/auth/merchant/merchant.repository";

@Injectable()
export class ShopService {
    constructor(private readonly merchantRepository: MerchantRepository) {}

    public async registerShop(
        registerShopDto: RegisterShopDto,
        merchant: Merchant
    ) {
        if (merchant.shop !== null)
            throw new BadRequestException("merchant's shopId is already set");

        return this.merchantRepository.registerShop(registerShopDto, merchant);
    }
}
