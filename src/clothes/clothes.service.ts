import {
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client
} from "@aws-sdk/client-s3";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateClothesDto } from "./dto/create-clothes.dto";
import { Clothes } from "./clothes.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ClothesService {
    private readonly S3: S3Client;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Clothes)
        private readonly clothesRepository: Repository<Clothes>
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
        createClothesDto: CreateClothesDto
    ) {
        const imageLinks: string[] = [];
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
                    "Can't send PutObjectCommand to S3"
                );
            }
            const imageLink = `https://${this.configService.getOrThrow(
                "AWS_BUCKET_NAME"
            )}.s3.amazonaws.com/${params.Key}`;

            imageLinks.push(imageLink);
        }

        await this.clothesRepository.save({
            ...createClothesDto,
            images: imageLinks
        });
    }
}
