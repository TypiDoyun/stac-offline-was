import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ClothesService } from "./clothes.service";
import { CreateClothesDto } from "./dto/create-clothes.dto";
import { MerchantPrivate, Private, UserField } from "src/common/decorators";
import { Merchant } from "src/auth/merchant/merchant.entity";

@Controller("clothes")
@UsePipes(ValidationPipe)
export class ClothesController {
    constructor(private readonly clothesService: ClothesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor("images"))
    @MerchantPrivate()
    public createClothes(
        @UploadedFile() images: Express.Multer.File[],
        @Body() createClothesDto: CreateClothesDto,
        @UserField() merchant: Merchant
    ) {
        return this.clothesService.createClothes(
            images,
            createClothesDto,
            merchant
        );
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async findClothes(@Query("name") name: string) {
        console.log("clothes find request received!");
        const value = await this.clothesService.findClothes(name);
        return value;
    }

    @Get("/location")
    @HttpCode(HttpStatus.OK)
    public async findClothesByLocation(
        @Query("latitude") latitude: number,
        @Query("longitude") longitude: number
    ) {
        console.log("clothes find by location request received!");
        console.log(latitude, longitude);
        return this.clothesService.findClothesByLocation([latitude, longitude]);
    }
}
