import {
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client
} from "@aws-sdk/client-s3";
import { HttpService } from "@nestjs/axios";
import {
    BadRequestException,
    ConflictException,
    Injectable
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { RegisterShopDto } from "src/auth/dto/register-shop.dto";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { MerchantRepository } from "src/auth/merchant/merchant.repository";

@Injectable()
export class ShopService {
    public S3: S3Client;

    constructor(
        private readonly configService: ConfigService,
        private readonly merchantRepository: MerchantRepository,
        private readonly httpService: HttpService
    ) {
        this.S3 = new S3Client({
            region: this.configService.getOrThrow("AWS_BUCKET_REGION"),
            credentials: {
                accessKeyId: this.configService.getOrThrow(
                    "AWS_BUCKET_ACCESS_KEY"
                ),
                secretAccessKey: this.configService.getOrThrow(
                    "AWS_BUCKET_PRIVATE_KEY"
                )
            }
        });
    }

    public async registerShop(
        logo: Express.Multer.File,
        registerShopDto: RegisterShopDto,
        merchant: Merchant
    ) {
        if (merchant.shop !== null)
            throw new BadRequestException("merchant's shopId is already set");

        const url = `${this.configService.getOrThrow("KAKAO_API_HOST")}?query=${
            registerShopDto.address
        }`;

        try {
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
            return this.merchantRepository.registerShop(
                registerShopDto,
                merchant,
                [
                    +response.data.documents[0].address.y,
                    +response.data.documents[0].address.x
                ]
            );
        } catch (error) {
            throw new ConflictException("location translate failed");
        }
    }

    public async uploadImage(logo: Express.Multer.File) {
        const params: PutObjectCommandInput = {
            Bucket: this.configService.getOrThrow("AWS_BUCKET_NAME"),
            Key: `${new Date().toISOString()}.${encodeURIComponent(
                logo.originalname ?? logo.filename
            )}`,
            Body: logo.buffer,
            ContentType: logo.mimetype
        };
        try {
            await this.S3.send(new PutObjectCommand(params));
        } catch (error) {
            console.log("S3");
            throw new BadRequestException("can't send PutObjectCommand to S3");
        }
        const imageLink = `https://${this.configService.getOrThrow(
            "AWS_BUCKET_NAME"
        )}.s3.amazonaws.com/${params.Key}`;

        return imageLink;
    }

    public async getShop(merchant: Merchant) {
        return merchant.shop;
    }

    public async getShopByLocation(locations: number[]) {
        const merchants = await this.merchantRepository.findMerchantByLocation(
            locations,
            1
        );
        return merchants.map((merchant) => {
            delete merchant.password;
            delete merchant.currentHashedRefreshToken;
            return {
                ...merchant.shop,
                owner: merchant
            };
        });
    }
}
