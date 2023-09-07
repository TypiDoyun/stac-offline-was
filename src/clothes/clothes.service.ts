import {
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client
} from "@aws-sdk/client-s3";
import {
    BadRequestException,
    ConflictException,
    Injectable
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateClothesDto } from "./dto/create-clothes.dto";
import { Clothes } from "./clothes.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { MerchantRepository } from "src/auth/merchant/merchant.repository";

@Injectable()
export class ClothesService {
    private readonly S3: S3Client;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Clothes)
        private readonly clothesRepository: Repository<Clothes>,
        private readonly merchantRepository: MerchantRepository
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

    public async createClothes(
        images: Express.Multer.File[],
        createClothesDto: CreateClothesDto,
        merchant: Merchant
    ) {
        const imageLinks: string[] = [
            "https://dy-03-bucket.s3.ap-northeast-2.amazonaws.com/bomb.png"
        ];
        try {
            await this.clothesRepository.save({
                ...createClothesDto,
                images: imageLinks,
                ownerId: merchant._id
            });
        } catch (error) {
            if (error.code === 11000)
                throw new ConflictException("clothes already exists");
            throw error;
        }
        for (const image of images) {
            const params: PutObjectCommandInput = {
                Bucket: this.configService.getOrThrow("AWS_BUCKET_NAME"),
                Key: `${new Date().toISOString()}.${encodeURIComponent(
                    image.originalname
                )}`,
                Body: image.buffer,
                ContentType: image.mimetype
            };
            try {
                await this.S3.send(new PutObjectCommand(params));
            } catch (error) {
                throw new BadRequestException(
                    "can't send PutObjectCommand to S3"
                );
            }
            const imageLink = `https://${this.configService.getOrThrow(
                "AWS_BUCKET_NAME"
            )}.s3.amazonaws.com/${params.Key}`;

            imageLinks.push(imageLink);
        }
    }

    public async findClothes(name: string) {
        return this.clothesRepository.findOne({
            relations: ["ownClothes"],
            where: {
                name
            }
        });
    }

    public async findClothesByLocation(location: number[]): Promise<Clothes[]> {
        const merchants = await this.merchantRepository.findMerchantByLocation(
            location,
            1
        );
        const clothes: Clothes[] = [];

        for (const merchant of merchants) {
            const clothesList = await this.clothesRepository.find({
                where: {
                    ownerId: merchant._id
                }
            });

            clothes.push(...clothesList);
        }

        for (let index = 0; index < clothes.length; index++) {
            clothes[index] = {
                ...clothes[index],
                owner: await this.merchantRepository.findMerchantByOId(
                    clothes[index].ownerId
                )
            };
        }

        return clothes;
    }

    public async deleteClothesByName(name: string) {
        if (!this.clothesRepository.exist({ where: { name } }))
            throw new BadRequestException("clothes not found");
        this.clothesRepository.delete({ name });
    }
}
