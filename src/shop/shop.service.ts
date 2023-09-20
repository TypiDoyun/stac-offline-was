import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { RegisterShopDto } from "src/auth/dto/register-shop.dto";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { MerchantRepository } from "src/auth/merchant/merchant.repository";

@Injectable()
export class ShopService {
    constructor(
        private readonly configService: ConfigService,
        private readonly merchantRepository: MerchantRepository,
        private readonly httpService: HttpService
    ) {}

    public async registerShop(
        registerShopDto: RegisterShopDto,
        merchant: Merchant
    ) {
        if (merchant.shop !== null)
            throw new BadRequestException("merchant's shopId is already set");

        const url = `${this.configService.getOrThrow("KAKAO_API_HOST")}?query=${
            registerShopDto.address
        }`;

        const pipe = this.httpService
            .get(url, {
                headers: {
                    Authorization: `KakaoAK ${this.configService.getOrThrow(
                        "KAKAO_API_KEY"
                    )}`
                }
            })
            .pipe();

        const response = await lastValueFrom(pipe);

        return this.merchantRepository.registerShop(registerShopDto, merchant, [
            +response.data.documents[0].address.y,
            +response.data.documents[0].address.x
        ]);
    }

    public async getShop(merchant: Merchant) {
        return merchant.shop;
    }
}
